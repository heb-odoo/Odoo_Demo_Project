# -*- coding: utf-8 -*-

from datetime import timedelta
import random
from odoo import models, fields, api

class Course(models.Model):
    _name = 'busdemoapp.bus'
    _description = "Bus_Demo_App Bus"


    name = fields.Char(string="Title", required=True)
    image = fields.Binary()


    @api.model
    def notify_student(self, notification):
        notifications = []
        print(notification)
        students = self.env['busdemoapp.students'].search([])
        for user in students:
            notif = notification
            notifications.append([(self._cr.dbname, 'image.data', user.partner_id.id), notif])
        if len(notifications) > 0:
            self.env['bus.bus'].sendmany(notifications)


class Student(models.Model):
    _name = 'busdemoapp.students'
    _description = "Bus_Demo_App Student"

    partner_id = fields.Many2one('res.partner', string="Student List")

    @api.model
    def add_member(self, partner_id):
        print(partner_id)
        student = self.search([('partner_id','=',partner_id)])
        print(student)
        if not student:
            student = self.create({
                    'partner_id': partner_id
                })
        return student
