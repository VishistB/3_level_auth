# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from rest_framework import status
from .serializers import UserRegistrationSerializer,UserLoginSerializer, OTPSerializer
from django.contrib.auth import authenticate
from rest_framework.authtoken.models import Token
from django.utils import timezone
from .models import CustomUser
from django.core.mail import send_mail
import random

# Create your views here.

@api_view(['GET'])
def GetEndPoints(request):
    return Response(
        {'http://localhost:8000/api/login/',
})

@api_view(['POST'])
def register(request):
    serializer = UserRegistrationSerializer(data=request.data)
    if serializer.is_valid():
        user = serializer.save()
        token, created = Token.objects.get_or_create(user=user)
        return Response({'Login': "successfull"})
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def login(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        password = serializer.validated_data['password']
        print(username,' ', password)

        user = authenticate(request, username=username, password=password)
        print(user)

        if user is not None:
            token, created = Token.objects.get_or_create(user=user)
            return Response({'token': token.key}, status=status.HTTP_200_OK)
        else:
            return Response({'error': 'Invalid credentials'}, status=status.HTTP_401_UNAUTHORIZED)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def send_otp(request):
    serializer = UserLoginSerializer(data=request.data)
    if serializer.is_valid():
        username = serializer.validated_data['username']
        email=request.data['email']
        print(email)

        # Generate OTP (in this case, a 6-digit random number)
        otp = str(random.randint(100000, 999999))

        # Update the user's OTP and OTP creation timestamp
        user, created = CustomUser.objects.get_or_create(username=username)
        user.otp = otp
        user.otp_created_at = timezone.now()
        user.save()

        # Send OTP to the user's email (you need to configure email settings)
        send_mail(
            'Your OTP for Login',
            f'Your OTP for login is: {otp}',
            'from@example.com',
            [email],
            fail_silently=False,
        )

        return Response({'message': 'OTP sent successfully'}, status=status.HTTP_200_OK)
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


@api_view(['POST'])
def verify_otp(request):
    serializer = OTPSerializer(data=request.data)
    if serializer.is_valid():
        otp = serializer.validated_data['otp']
        email = request.data.get('email')  # Assuming email is sent in the request data

        try:
            # Query the user based on the email
            user = CustomUser.objects.get(email=email)

            # Check if the OTP matches and is still valid (e.g., within a certain timeframe)
            if user.otp == otp and user.otp_created_at >= timezone.now() - timezone.timedelta(minutes=5):
                # For simplicity, let's assume a successful verification
                return Response({'message': 'OTP verified successfully'}, status=status.HTTP_200_OK)
            else:
                return Response({'message': 'OTP verification failed'}, status=status.HTTP_400_BAD_REQUEST)

        except CustomUser.DoesNotExist:
            return Response({'message': 'User not found'}, status=status.HTTP_404_NOT_FOUND)

    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)