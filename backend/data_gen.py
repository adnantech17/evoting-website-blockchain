from users.models import User

def generate_user():
    data = []
    for i in range(1, 15):
        data.append({"username": str(i), "password": str(i)})
    return data

def generate_trustee():
    data = []
    for i in range(1, 3):
        data.append({"username": f't{i}', "password": str(i), "is_staff": True})
    return data


def run():
    data = generate_user()
    User.objects.bulk_create([User(**state) for state in data])
    data = generate_trustee()
    User.objects.bulk_create([User(**state) for state in data])
    return
