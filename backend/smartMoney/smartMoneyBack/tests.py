from django.test import TestCase, Client
from django.urls import reverse


from smartMoneyBack.models import Page


class WebsiteTests(TestCase):
    def test_page_is_created_successfully(self):
        page = Page(
            name='Home',
            slug='home'
        )
        page.save()