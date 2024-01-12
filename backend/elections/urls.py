from django.urls import path
from .views import GetKeyView, PerformVoteView, GetVIDsView, ElectionListView, ElectionDetailView, SubmitKeyView

urlpatterns = [
    path('get-key/<int:election_id>/', GetKeyView.as_view()),
    path('perform-vote/<int:election_id>/', PerformVoteView.as_view()),
    path('get-vids/<int:election_id>/', GetVIDsView.as_view()),
    path('get-elections/', ElectionListView.as_view()),
    path('get-elections/<int:election_id>/', ElectionDetailView.as_view()),
    path('submit-key/<int:election_id>/', SubmitKeyView.as_view()),
]
