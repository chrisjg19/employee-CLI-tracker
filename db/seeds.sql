USE employeeTracker_db

INSERT INTO department ( department_name) VALUES
('Sales'),
('Engineering'),
('Finance'),
('Legal');

INSERT INTO role  (title, salary, department_id) VALUES
('Sales Manager', 45000, 1),
('Sales Person', 28000, 1),
('Lead Engineer', 95000, 2),
('Assistant Engineer', 80000, 2),
('Account Manager', 110000, 3),
('Accountant', 80000, 3),
('Lawyer', 160000, 4),
('Paralegal' 60000, 4);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES
('Chris', 'Gonzalez',1,1)
('Robert', 'Vela',2,NULL)
('Alex', 'Mora',3,2)
('Jim', 'Jones',4, NULL)
('Stacey', 'Gohn',5,3)
('Bety', 'Gonzalez',6, NULL)
('Luis', 'Armstrong',7, 4)
('Jane', 'Doe',8, NULL);

