# -*- coding: utf-8 -*-


from odoo import models, fields, api

class Inheritance(models.Model):
    _inherit = 'openacademy.course'

    idea_ids = fields.Integer(String="ID")

    