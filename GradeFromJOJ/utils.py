import os

dotenv_path = '.env'


def import_env():
    with open(dotenv_path) as dotenv:
        for line in dotenv:
            var = line.strip().split('=')
            if len(var) == 2:
                key, value = var[0].strip(), var[1].strip()
                os.environ[key] = value
