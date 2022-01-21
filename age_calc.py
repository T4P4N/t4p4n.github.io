import time
from dateutil.relativedelta import *
from datetime import datetime
from datetime import date


NOW = datetime.now()
TODAY = date.today()
birthday_date = date(2000, 1, 25)

def get_age():
    age = relativedelta(TODAY, birthday_date)
    return f'{age.years} years | {age.months} months | {age.days} days'

def get_next_bday():
    TODAY == date.fromtimestamp(time.time())
    bddt = date(TODAY.year, birthday_date.month, birthday_date.day)
    if bddt < TODAY:
        newdate = bddt.replace(year=TODAY.year + 1)
        result = f"is on {newdate.strftime('%d %B %Y (%A)')}!"
    elif bddt == TODAY:
        result = "Happy Birthday!!!"
    else:
        days_left = bddt - TODAY
        result = f"{days_left.days} days"
    return result
    
print('Today: ', TODAY.strftime('%d, %B, %Y'))
print('Dob: ', birthday_date.strftime('%d, %B, %Y'))
print('Age: ', get_age())
print('Next bday: ', get_next_bday())

