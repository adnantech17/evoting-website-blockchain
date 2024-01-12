from rest_framework.response import Response
from rest_framework.views import APIView
from .interact_key_utils import get_key
from django.utils import timezone
from .interact_utils import perform_vote, submitKey, get_vids, get_vote_count
from rest_framework import status
from .models import Election, Vote
from .serializers import KeyDataSerializer, ElectionSerializer
from django.contrib.auth import authenticate

# Create your views here.
class GetKeyView(APIView):
    def get(self, request, election_id):
        try:
            election = Election.objects.get(id=election_id)
            contract_address = election.contract_address
            key_data = get_key(contract_address)
            serializer = KeyDataSerializer(data=key_data)
            serializer.is_valid(raise_exception=True)
            return Response({"data": serializer.data, "success": True})
        except Election.DoesNotExist:
            return Response({"message": "Election not found", "success": False}, status=status.HTTP_404_NOT_FOUND)


class PerformVoteView(APIView):
    def post(self, request, election_id):
        username = request.data.get('username')
        password = request.data.get('password')

        id = int(request.data.get("id"))

        user = authenticate(request, username=username, password=password)
        if not user:
            return Response({"message": "Invalid credentials", "success": False}, status=status.HTTP_401_UNAUTHORIZED)

        if not id:
            return Response({"message": "Ok", "success": True})

        election = Election.objects.get(id=election_id)
        if Vote.objects.filter(user=user).exists():
            return Response({"message": "User already voted", "success": False}, status=status.HTTP_400_BAD_REQUEST)

        try:
            perform_vote(election.contract_address, id)  # Call your Web3 function
            Vote.objects.create(user=user, vote_done=True)
            return Response({"message": "Vote successful", "success": True})
        except Exception as e:
            return Response({"message": str(e), "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubmitKeyView(APIView):
    # permission_classes = [IsAuthenticated]  # Require authentication

    def post(self, request, election_id):
        serializer = KeyDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        election = Election.objects.get(id=election_id)
        contract_address = election.contract_address

        user = request.user
        key = serializer.validated_data['key']

        try:
            submitKey(contract_address, key)  # Call your Web3 function
            Vote.objects.create(user=user, vote_done=True)  # Assuming key submission marks a vote
            return Response({"message": "Key submitted successfully", "success": True})
        except Exception as e:
            return Response({"error": str(e), "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetVIDsView(APIView):

    def get(self, request, election_id):
        election = Election.objects.get(id=election_id)
        contract_address = election.contract_address
        try:
            vids = get_vids(contract_address)
            return Response({"vids": vids, "success": True})
        except Exception as e:
            return Response({"error": str(e), "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)

class ElectionListView(APIView):
    def get(self, request):
        elections = Election.objects.all()
        serializer = ElectionSerializer(elections, many=True)
        return Response({"data": serializer.data, "success": True})

class ElectionDetailView(APIView):
    def get(self, request, election_id):
        try:
            election = Election.objects.get(pk=election_id)
            serializer = ElectionSerializer(election)
            if election.end_date < timezone.now():
                vote_count = get_vote_count(election.contract_address)
            return Response({'data': {"election": serializer.data, "vote_count": vote_count}, 'success': True})
        except Election.DoesNotExist:
            return Response({"message": "Election not found", 'success': False}, status=404)


