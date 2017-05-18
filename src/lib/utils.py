from disposable_email_checker.validators import validate_disposable_email
from django.core.exceptions import ValidationError
from django.core.validators import validate_email as django_validate_email
from django.db import transaction
from django.utils.decorators import method_decorator
from django.views.decorators.csrf import csrf_exempt
from rest_framework.authentication import SessionAuthentication


def validate_email(value):
    """Validate a single email."""
    if not value:
        return False
    # Check the regex, using the validate_email from django.
    try:
        django_validate_email(value)
    except ValidationError:
        return False
    else:
        # Check with the disposable list.
        try:
            validate_disposable_email(value)
        except ValidationError:
            return False
        else:
            return True


class AtomicMixin(object):
    """
    Ensure we rollback db transactions on exceptions.

    From https://gist.github.com/adamJLev/7e9499ba7e436535fd94 .
    """

    @transaction.atomic()
    def dispatch(self, *args, **kwargs):
        """Atomic transaction."""
        return super(AtomicMixin, self).dispatch(*args, **kwargs)

    def handle_exception(self, *args, **kwargs):
        """Handle exception with transaction rollback."""
        response = super(AtomicMixin, self).handle_exception(*args, **kwargs)

        if getattr(response, 'exception'):
            # We've suppressed the exception but still need to rollback any transaction.
            transaction.set_rollback(True)

        return response


class CSRFExemptMixin(object):
    """Ensure we can access REST server even from another domain. (remove csrf protection)."""

    @method_decorator(csrf_exempt)
    def dispatch(self, *args, **kwargs):
        """Override Dispatch Method."""
        return super(CSRFExemptMixin, self).dispatch(*args, **kwargs)


class CsrfExemptSessionAuthentication(SessionAuthentication):

    def enforce_csrf(self, request):
        """Override enforce_csrf method with a null body."""
        return

