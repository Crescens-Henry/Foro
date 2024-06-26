from django.db import models
from users.models import User


# --------------------------------------MODELS------------------------------
# Creamos la clase de blog que hereda de models.Model
class Blog(models.Model):
    title = models.CharField(max_length=100, null=True)  # Nuevo campo para el título del blog    
    # Definimos el campo del cuerpo del blog
    body = models.CharField(max_length=100)
    sources = models.CharField(max_length=200, null=True)  # Nuevo campo para las fuentes

    # Definimos el campo de user que es una clave foránea del modelo User
    # on_delete nos permite definir que pasa con los blogs de un usuario si se elimina el usuario
    # Usamos null=True para que el campo pueda estar vacío
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    # Definimos el campo de date que sera la fecha de creación del blog
    date = models.DateTimeField(auto_now_add=True)


# Definimos la clase de comment que hereda de models.Model
class Comment(models.Model):
    # Definimos el campo de blog que es una clave foránea del modelo Blog
    # on_delete nos permite definir que pasa con los comentarios de un blog si se elimina el blog
    # Usamos null=True para que el campo pueda estar vacío
    blog = models.ForeignKey(Blog, on_delete=models.CASCADE, null=True)

    # Definimos el campo de user que es una clave foránea del modelo User
    # on_delete nos permite definir que pasa con los comentarios de un usuario si se elimina el usuario
    # Usamos null=True para que el campo pueda estar vacío
    user = models.ForeignKey(User, on_delete=models.CASCADE, null=True)

    # Definimos el campo de text que es el texto del comentario
    text = models.CharField(max_length=100)

    # Definimos el campo de date que sera la fecha de creación del comentario
    date = models.DateTimeField(auto_now_add=True)


# --------------------------------------MODELS------------------------
