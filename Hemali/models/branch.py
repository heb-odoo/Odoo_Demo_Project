from odoo import models, fields

class Name(models.Model):
    _name = 'hemali.name'
    _description = "Hemali Demo"


    name = fields.Char(string="Title", required=True)