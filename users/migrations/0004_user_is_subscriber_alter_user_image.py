# Generated by Django 4.2.1 on 2024-04-14 02:17

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('users', '0003_alter_user_image'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='is_subscriber',
            field=models.BooleanField(default=False),
        ),
        migrations.AlterField(
            model_name='user',
            name='image',
            field=models.ImageField(blank=True, default='/default.png', null=True, upload_to=''),
        ),
    ]
