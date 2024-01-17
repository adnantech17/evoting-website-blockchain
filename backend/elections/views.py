from rest_framework.response import Response
from rest_framework.views import APIView
from .interact_key_utils import get_key
from django.utils import timezone
from .interact_utils import perform_vote, submit_key, get_vids, get_vote_count
from rest_framework import status
from .models import Election, Vote
from users.models import User
from .serializers import KeyDataSerializer, ElectionSerializer
from django.contrib.auth import authenticate
from random import *

# Create your views here.
class GetKeyView(APIView):
    def post(self, request, election_id):
        username = request.data.get('username')
        password = request.data.get('password')

        try:
            user = User.objects.get(username=username, password=password)
        except:
            return Response({"message": "User not found!", "success": False}, status=status.HTTP_400_BAD_REQUEST)

        if user.is_staff:
            return Response({"data": randint(1, 5) * 512345, "success": True})
        
        return Response({"message": "Sorry! You are not permitted to do so.", "success": False}, status=status.HTTP_403_FORBIDDEN)


class PerformVoteView(APIView):
    def post(self, request, election_id):
        username = request.data.get('username')
        password = request.data.get('password')

        id = request.data.get("id")
        try:
            user = User.objects.get(username=username, password=password)
        except:
            return Response({"message": "User not found!", "success": False}, status=status.HTTP_400_BAD_REQUEST)

        if Vote.objects.filter(user=user).exists():
            return Response({"message": "User already voted", "success": False}, status=status.HTTP_400_BAD_REQUEST)

        if id is None:
            return Response({"message": "Ok", "success": True})

        id = int(id)

        print(user, Vote.objects.all())

        election = Election.objects.get(id=election_id)

        try:
            vid = perform_vote(election.contract_address, id)  # Call your Web3 function
            Vote.objects.create(user=user, vote_done=True)
            return Response({"message": "Vote successful", "vid": str(vid), "success": True})
        except Exception as e:
            return Response({"message": str(e), "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class SubmitKeyView(APIView):
    # permission_classes = [IsAuthenticated]  # Require authentication

    def post(self, request, election_id):
        serializer = KeyDataSerializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        election = Election.objects.get(id=election_id)
        contract_address = election.contract_address

        key = serializer.validated_data['key']

        try:
            print(contract_address, int(key))
            submit_key(contract_address, int(key))  # Call your Web3 function
            return Response({"message": "Key submitted successfully", "success": True})
        except Exception as e:
            print(e)
            return Response({"error": str(e), "success": False}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


class GetVIDsView(APIView):
    def get(self, request, election_id):
        election = Election.objects.get(id=election_id)
        contract_address = election.contract_address
        try:
            vids = get_vids(contract_address)
            return Response({"data": vids, "success": True})
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
            vote_count = None
            if election.end_date < timezone.now():
                vote_count = get_vote_count(election.contract_address)
            return Response({'data': {"election": serializer.data, "vote_count": vote_count}, 'success': True})
        except Election.DoesNotExist:
            return Response({"message": "Election not found", 'success': False}, status=404)


