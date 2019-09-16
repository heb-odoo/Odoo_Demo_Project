{
    'name': "Openacademy",
    'version': '1.0',
    #'depends': ['base'],
    'author': "hemali",
    'category': 'Tools',
    'depends': ['base', 'board','website','website_sale'],
    'description': """,
    Courses for student
    """,
    # data files always loaded at installation
    'data': [
        'security/security.xml',
        'security/ir.model.access.csv',
        'views/openacademy.xml',
        'views/partner.xml',
        # 'views/session_board.xml',
        
        'views/templates.xml',
        'demo/data.xml',
        'demo/demo.xml',
        'views/views.xml',
        'views/reports.xml',
        'views/assets.xml'
    ],
    'qweb' : ['static/src/xml/widget_template.xml',
    'views/systray.xml'
    ],
    # 'application': True,
}