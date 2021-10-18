class baseModel():
    @classmethod
    def getAllWith(cls,filter = None,**extra_fields):
        if filter:
            return cls.objects.filter(filter)
        return cls.objects.filter(**extra_fields)

    @classmethod
    def get(cls, filter = None, **extra_fields):
        if filter:
            return cls.objects.filter(filter).first()
        return cls.objects.filter(**extra_fields).first()
    def save(self,*arg,**args):
        self.full_clean()
        super().save(*arg,**args)
    def modify(self, **args_to_change):
        keys = args_to_change.keys()
        for argument in keys:\
            setattr(self, argument, args_to_change[argument])
        self.save()
        return self