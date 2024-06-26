from datetime import timedelta
from pathlib import Path
import os
from environ import Env


# --------------------------------ENVIRONMENT VARIABLES--------------------------------
# Env es una clase que nos permite acceder a las variables de entorno
env = Env()

# Lee el archivo .env y lo carga en las variables de entorno
env.read_env()

# Definimos las variables de entorno
ENVIROMENT = env
# --------------------------------ENVIRONMENT VARIABLES--------------------------------


# Build paths inside the project like this: BASE_DIR / 'subdir'.
BASE_DIR = Path(__file__).resolve().parent.parent


# SECURITY WARNING: keep the secret key used in production secret!
# Obtenemos la variable de entorno SECRET_KEY
SECRET_KEY = os.environ.get("SECRET_KEY")

# SECURITY WARNING: don't run with debug turned on in production!
# Importamos de env la variable de entorno DEBUG
DEBUG = os.environ.get("DEBUG")

ALLOWED_HOSTS = []

CORS_ALLOW_ALL_ORIGINS = True


# Application definition
INSTALLED_APPS = [
    "django.contrib.admin",
    "django.contrib.auth",
    "django.contrib.contenttypes",
    "django.contrib.sessions",
    "django.contrib.messages",
    "django.contrib.staticfiles",
    # Inclumos corsheaders para poder usar CORS
    # Cors nos  sirve para poder hacer peticiones desde el frontend
    "corsheaders",
    # Incluimos rest_framework para poder usar la API
    "rest_framework",
    # Incluimos nuestras aplicaciones
    "blogs",
    "users",
]


# Incluimos las direcciones que podran acceder a nuestro aplicativo
CORS_ALLOWED_ORIGINS = [
    # Incluimos la ip de react para el desarrollo
    "http://localhost:3000",
    # Incluimos la ip de react para el desarrollo
    "http://127.0.0.1:3000",
]
# -------------------------------TAILWIND CONFIGURATION--------------------------------


# -----------------------REST FRAMEWORK CONFIGURATION--------------------------------
# Definimos el tipo de autenticacion que usaremos en nuestra api rest
REST_FRAMEWORK = {
    "DEFAULT_AUTHENTICATION_CLASSES": (
        # Incluimos la autenticacion por token de jwt
        # JWT es un tipo de token que nos permite autenticar a los usuarios en todas las peticiones
        "rest_framework_simplejwt.authentication.JWTAuthentication",
    )
}


# Definimos el tiempo de expiracion del token
SIMPLE_JWT = {
    # Definimos el tiempo de expiracion del token
    "ACCESS_TOKEN_LIFETIME": timedelta(days=30),
    # Refrescar el token de refresco es para que el token de refresco se cambie cada vez que se use
    "REFRESH_TOKEN_LIFETIME": timedelta(days=1),
    # Rotar los tokens de refresco es para que el token de refresco se cambie cada vez que se use
    "ROTATE_REFRESH_TOKENS": False,
    # Blacklist after rotation es para que el token anterior no se pueda usar
    "BLACKLIST_AFTER_ROTATION": False,
    # Update last login es para actualizar la fecha de ultimo login
    "UPDATE_LAST_LOGIN": False,
    # Definimos el algoritmo que usaremos para crear el token
    # El algoritmo HS256 es un algoritmo de encriptacion que usa una clave secreta
    "ALGORITHM": "HS256",
    # Definimos la clave secreta que usaremos para crear el token (Solo el servidor debe conocerla)
    "SIGNING_KEY": SECRET_KEY,
    # Definimos la clave publica que usaremos para verificar el token
    "VERIFYING_KEY": None,
    # Audience es para definir el publico al que va dirigido el token (Quien lo puede usar)
    "AUDIENCE": None,
    # Issuer es para definir el emisor del token (Quien lo creo)
    "ISSUER": None,
    # JWK_URL es para definir la url donde se encuentra la clave publica (Solo se usa con el algoritmo RS256)
    "JWK_URL": None,
    # Leeway es para definir el tiempo de expiracion del token (En segundos)
    "LEEWAY": 0,
    # AUTH HEADER TYPES es para definir el tipo de autenticacion que usaremos en el header (Bearer es el mas usado)
    "AUTH_HEADER_TYPES": ("Bearer",),
    # AUTH HEADER NAME es para definir el nombre del header que usaremos para la autenticacion (Authorization es el mas usado)
    "AUTH_HEADER_NAME": "HTTP_AUTHORIZATION",
    # USER ID FIELD es para definir el campo que usaremos para identificar al usuario (id es el mas usado)
    "USER_ID_FIELD": "id",
    # USER ID CLAIM es para definir el claim que usaremos para identificar al usuario (user_id es el mas usado)
    "USER_ID_CLAIM": "user_id",
    # USER AUTHENTICATION RULE es para definir la regla de autenticacion que usaremos (default_user_authentication_rule es el mas usado)
    "USER_AUTHENTICATION_RULE": "rest_framework_simplejwt.authentication.default_user_authentication_rule",
    # AUTH TOKEN CLASSES es para definir el tipo de token que usaremos (AccessToken es el mas usado)
    "AUTH_TOKEN_CLASSES": ("rest_framework_simplejwt.tokens.AccessToken",),
    # TOKEN TYPE CLAIM es para definir el claim que usaremos para identificar el tipo de token (token_type es el mas usado)
    "TOKEN_TYPE_CLAIM": "token_type",
    # TOKEN USER CLASS es para definir la clase que usaremos para identificar al usuario (TokenUser es el mas usado)
    "TOKEN_USER_CLASS": "rest_framework_simplejwt.models.TokenUser",
    # JTI CLAIM es para definir el claim que usaremos para identificar el token (jti es el mas usado)
    "JTI_CLAIM": "jti",
    # SLIDING TOKEN REFRESH EXP CLAIM es para definir el claim que usaremos para identificar la fecha de expiracion del token de refresco (refresh_exp es el mas usado)
    "SLIDING_TOKEN_REFRESH_EXP_CLAIM": "refresh_exp",
    # SLIDING TOKEN LIFETIME es para definir el tiempo de expiracion del token de refresco (En segundos)
    "SLIDING_TOKEN_LIFETIME": timedelta(minutes=5),
    # SLIDING TOKEN REFRESH LIFETIME es para definir el tiempo de expiracion del token de refresco (En segundos)
    "SLIDING_TOKEN_REFRESH_LIFETIME": timedelta(days=1),
}
# -----------------------REST FRAMEWORK CONFIGURATION--------------------------------


# -----------------------DJANGO CONFIGURATION--------------------------------
MIDDLEWARE = [
    'corsheaders.middleware.CorsMiddleware',
    'django.middleware.security.SecurityMiddleware',
    'django.contrib.sessions.middleware.SessionMiddleware',
    'django.middleware.common.CommonMiddleware',
    'django.middleware.csrf.CsrfViewMiddleware',
    'django.contrib.auth.middleware.AuthenticationMiddleware',
    'django.contrib.messages.middleware.MessageMiddleware',
    'django.middleware.clickjacking.XFrameOptionsMiddleware',
]


ROOT_URLCONF = "backend.urls"


TEMPLATES = [
    {
        "BACKEND": "django.template.backends.django.DjangoTemplates",
        "DIRS": [],
        "APP_DIRS": True,
        "OPTIONS": {
            "context_processors": [
                "django.template.context_processors.debug",
                "django.template.context_processors.request",
                "django.contrib.auth.context_processors.auth",
                "django.contrib.messages.context_processors.messages",
            ],
        },
    },
]

WSGI_APPLICATION = "backend.wsgi.application"


# Database
# https://docs.djangoproject.com/en/4.1/ref/settings/#databases

DATABASES = {
    "default": {
        "ENGINE": "django.db.backends.sqlite3",
        "NAME": BASE_DIR / "foro-django.sqlite3",
    }
}


# Password validation
# https://docs.djangoproject.com/en/4.1/ref/settings/#auth-password-validators

AUTH_PASSWORD_VALIDATORS = [
    {
        "NAME": "django.contrib.auth.password_validation.UserAttributeSimilarityValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.MinimumLengthValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.CommonPasswordValidator",
    },
    {
        "NAME": "django.contrib.auth.password_validation.NumericPasswordValidator",
    },
]


# Internationalization
# https://docs.djangoproject.com/en/4.1/topics/i18n/

LANGUAGE_CODE = "en-us"

TIME_ZONE = "UTC"

USE_I18N = True

USE_TZ = True


# Static files (CSS, JavaScript, Images)
# https://docs.djangoproject.com/en/4.1/howto/static-files/

STATIC_URL = "static/"


# Definimos la ruta de los archivos estaticos (CSS, JavaScript, Images)
MEDIA_URL = "/media/"

# Definimos la ruta de los archivos estaticos
# Usamos os.path.join para unir la ruta de la carpeta media con la ruta de la carpeta base
MEDIA_ROOT = os.path.join(BASE_DIR, "media")


# Default primary key field type
# https://docs.djangoproject.com/en/4.1/ref/settings/#default-auto-field

DEFAULT_AUTO_FIELD = "django.db.models.BigAutoField"


# Definimos el modelo de usuario que usaremos
AUTH_USER_MODEL = "users.User"
