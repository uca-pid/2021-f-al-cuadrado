#!/usr/bin/env python
import django_heroku

from distutils.core import setup

setup(name='MVP',
      version='1.0',
      description='SmartMoney back 1.0',
      author='De Grandis Francisco, Stulich Federico',
      url='https://www.python.org/sigs/distutils-sig/'
     )

django_heroku.settings(locals())