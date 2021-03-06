from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from rest_framework.exceptions import NotFound, PermissionDenied
from datetime import datetime, timedelta
from django.contrib.auth import get_user_model
from django.conf import settings
import jwt
from .serializer import UserSerializer
from .populated import PopulatedUserSerializer

User = get_user_model()

class RegisterView(APIView):

    def post(self, request):
        user_to_create = UserSerializer(data=request.data)
        if user_to_create.is_valid():
            user_to_create.save()
            return Response({'message': 'Registration successful'}, status=status.HTTP_202_ACCEPTED)

        return Response(user_to_create.errors, status=status.HTTP_422_UNPROCESSABLE_ENTITY)


class LoginView(APIView):

    def post(self, request):
        email = request.data.get('email')
        password = request.data.get('password')
        try:
            user_to_login = User.objects.get(email=email)
        except User.DoesNotExist:
            print('FIRST ERROR')
            raise PermissionDenied(detail='Invalid credentials')
        if not user_to_login.check_password(password):
            print('SECOND ERROR')
            raise PermissionDenied(detail='Invalid credentials')
            
        dt = datetime.now() + timedelta(days=2)
        token = jwt.encode({'sub': user_to_login.id, 'exp':int(dt.strftime('%s'))}, settings.SECRET_KEY, algorithm='HS256')
        return Response({'token': token, 'message': f'Welcome back {user_to_login.username}!'})
        

class UserProfile(APIView):
    def get(self, request):
        try:
            user = request.user
            serialized_user = PopulatedUserSerializer(user)
            return Response(serialized_user.data, status=status.HTTP_200_OK )
        except:
            return Response(status=status.HTTP_404_NOT_FOUND)

    def delete(self, request):
        try:
            user = request.user
            user_to_delete = User.objects.get(id=user.id)
            print('USER ----->',user_to_delete)
        except User.DoesNotExist:
            raise NotFound()
        user.delete()
        return Response(status=status.HTTP_204_NO_CONTENT)
        