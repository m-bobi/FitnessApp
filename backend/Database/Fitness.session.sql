
CREATE TABLE Permission (
  per_id int NOT NULL AUTO_INCREMENT,
  perDesc text NOT NULL,
  PRIMARY KEY (per_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Roles (
  role_id int NOT NULL AUTO_INCREMENT,
  roleType varchar(100) NOT NULL,
  per_id int NOT NULL,
  PRIMARY KEY (role_id),
  CONSTRAINT Roles_Permission_FK FOREIGN KEY (per_id) REFERENCES Permission (per_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Class (
  class_id int NOT NULL AUTO_INCREMENT,
  class_type varchar(100) NOT NULL,
  workout_timeDate datetime NOT NULL,
  PRIMARY KEY (class_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- FitnessApp.Trainer definition

CREATE TABLE Trainer (
  trainer_id int NOT NULL AUTO_INCREMENT,
  name varchar(10) NOT NULL,
  email varchar(100) NOT NULL,
  address varchar(100) NOT NULL,
  per_id int NOT NULL,
  PRIMARY KEY (trainer_id),
  UNIQUE KEY trainer_email_unique (email),
  CONSTRAINT Trainer_Permission_FK FOREIGN KEY (per_id) REFERENCES Premission (per_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- FitnessApp.Memberships definition

CREATE TABLE Memberships (
  mtype_id int NOT NULL AUTO_INCREMENT,
  `desc`   varchar(100) null,
  PRIMARY KEY (mtype_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- FitnessApp.Members definition

CREATE TABLE Members (
  join_date datetime NOT NULL,
  member_id int NOT NULL AUTO_INCREMENT,
  mtype_id int NOT NULL,
  PRIMARY KEY (member_id),
  KEY Members_Memberships_FK (mtype_id),
  CONSTRAINT Members_Memberships_FK FOREIGN KEY (mtype_id) REFERENCES Memberships (mtype_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

CREATE TABLE Users (
  user_id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  username varchar(100) NOT NULL,
  email varchar(100) NOT NULL,
  password varchar(100) NOT NULL,
  mobile int DEFAULT NULL,
  age int DEFAULT NULL,
  gender char(1) DEFAULT NULL,
  address varchar(100) DEFAULT NULL,
  trainer_id int NOT NULL,
  member_id int NOT NULL,
  role_id int NOT NULL,
  PRIMARY KEY (user_id),
  UNIQUE KEY Users_UNIQUE (username),
  UNIQUE KEY user_email_unique (email),
  CONSTRAINT Users_Trainer_FK FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id),
  CONSTRAINT Users_Members_FK FOREIGN KEY (member_id) REFERENCES Members (member_id),
  CONSTRAINT Users_Roles_FK FOREIGN KEY (role_id) REFERENCES Roles (role_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;

-- FitnessApp.Manager definition

CREATE TABLE Manager (
    manager_id int NOT NULL AUTO_INCREMENT,
    name varchar(10) NOT NULL,
    lastname varchar(10) NOT NULL,
    email varchar(100) NOT NULL,
    user_id int NOT NULL,
    PRIMARY KEY (manager_id),
    UNIQUE KEY manager_email_unique (email),
    CONSTRAINT Manager_Users_FK FOREIGN KEY (user_id) REFERENCES Users (user_id)
)   ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Gym (
  gym_id int NOT NULL AUTO_INCREMENT,
  location varchar(100) NOT NULL,
  open_hours datetime NOT NULL,
  capacity int NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY (gym_id),
  CONSTRAINT Gym_Manager_FK FOREIGN KEY (manager_id) REFERENCES Manager (manager_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Orders (
  order_id int NOT NULL AUTO_INCREMENT,
  order_Date datetime NOT NULL,
  total_Amount float NOT NULL,
  order_Status varchar(100) NOT NULL,
  user_id int NOT NULL,
  PRIMARY KEY (order_id),
  CONSTRAINT Orders_Users_FK FOREIGN KEY (user_id) REFERENCES Users (user_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Products (
  product_id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  description text NOT NULL,
  price float NOT NULL,
  category varchar(100) NOT NULL,
  image varchar(100) NOT NULL,
  stock int NOT NULL,
  PRIMARY KEY (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE product_order (
  orderProduct_id int NOT NULL,
  order_id int NOT NULL,
  product_id int NOT NULL,
  quantity text NOT NULL,
  PRIMARY KEY (orderProduct_id),
  CONSTRAINT product_order_Orders_FK FOREIGN KEY (order_id) REFERENCES Orders (order_id),
  CONSTRAINT product_order_Products_FK FOREIGN KEY (product_id) REFERENCES Products (product_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Payment (
  payment_id int NOT NULL AUTO_INCREMENT,
  amount float NOT NULL,
  date_time datetime NOT NULL,
  user_id int NOT NULL,
  order_id int NOT NULL,
  PRIMARY KEY (payment_id),
  CONSTRAINT Payment_Users_FK FOREIGN KEY Users (user_id)  REFERENCES Users (user_id),
  CONSTRAINT Payment_Orders_FK FOREIGN KEY Orders (order_id) REFERENCES Orders (order_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Workout_Plan (
  workoutPlan_id int NOT NULL AUTO_INCREMENT,
  workout_timeDate datetime NOT NULL,
  workout_type varchar(100) NOT NULL,
  member_id int NOT NULL,
  PRIMARY KEY (workoutPlan_id),
  CONSTRAINT Workout_Plan_Members_FK FOREIGN KEY (member_id) REFERENCES Members (member_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Offers (
  offer_id int NOT NULL AUTO_INCREMENT,
  offerType varchar(100) NOT NULL,
  description text NOT NULL,
  endDate datetime NOT NULL,
  duration datetime NOT NULL,
  discount int NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY (offer_id),
  CONSTRAINT Offers_Manager_FK FOREIGN KEY (manager_id) REFERENCES Manager (manager_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Sponsors (
  sponsor_id int NOT NULL AUTO_INCREMENT,
  companyName varchar(100) NOT NULL,
  sponsorType varchar(100) NOT NULL,
  manager_id int NOT NULL,
  PRIMARY KEY (sponsor_id),
  CONSTRAINT Sponsors_Manager_FK FOREIGN KEY (manager_id) REFERENCES Manager (manager_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Members_Class (
  member_id int NOT NULL,
  class_id int NOT NULL,
  CONSTRAINT Members_Class_Members_FK FOREIGN KEY (member_id) REFERENCES Members (member_id),
  CONSTRAINT Members_Class_Class_FK FOREIGN KEY (class_id) REFERENCES Class (class_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Trainer_Class (
  trainer_id int NOT NULL,
  class_id int NOT NULL,
  CONSTRAINT Trainer_Class_Trainer_FK FOREIGN KEY (trainer_id) REFERENCES Trainer (trainer_id),
  CONSTRAINT Trainer_Class_Class_FK FOREIGN KEY (class_id) REFERENCES Class (class_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Workout (
  workout_id int NOT NULL AUTO_INCREMENT,
  name varchar(10) NOT NULL,
  description text NOT NULL,
  class_id int NOT NULL,
  PRIMARY KEY (workout_id),
  CONSTRAINT Workout_Class_FK FOREIGN KEY (class_id) REFERENCES Class (class_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Personalized_Workout (
  personalized_id int NOT NULL AUTO_INCREMENT,
  name varchar(100) NOT NULL,
  type varchar(100) NOT NULL,
  member_id int NOT NULL,
  PRIMARY KEY (personalized_id),
  CONSTRAINT Personalized_Workout_Members_FK FOREIGN KEY (member_id) REFERENCES Members (member_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



CREATE TABLE Workout_PersonalizedWorkout (
  workout_id int NOT NULL,
  personalized_id int NOT NULL,
  CONSTRAINT Workout_PersonalizedWorkout_Workout_FK FOREIGN KEY (workout_id) REFERENCES Workout (workout_id),
  CONSTRAINT Workout_PersonalizedWorkout_Personalized_Workout_FK FOREIGN KEY (personalized_id) REFERENCES Personalized_Workout (personalized_id)
) ENGINE=InnoDB DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci;



-- Insert sample data into the Permission table
INSERT INTO Permission (perDesc) VALUES
                                     ('Admin'),
                                     ('Trainer'),
                                     ('Member');

-- Insert sample data into the Roles table
INSERT INTO Roles (roleType, per_id) VALUES
                                         ('Admin Role', 1),
                                         ('Trainer Role', 2),
                                         ('Member Role', 3);

-- Insert sample data into the Class table
INSERT INTO Class (class_type, workout_timeDate) VALUES
                                                     ('Yoga', NOW()),
                                                     ('Pilates', NOW()),
                                                     ('CrossFit', NOW());

-- Insert sample data into the Trainer table
INSERT INTO Trainer (name, email, address, per_id) VALUES
                                                       ('John Doe', 'john@example.com', '123 Main St', 2),
                                                       ('Jane Smith', 'jane@example.com', '456 Elm St', 2);

-- Insert sample data into the Memberships table
INSERT INTO Memberships (`desc`) VALUES
                                     ('Basic'),
                                     ('Premium'),
                                     ('Gold');

-- Insert sample data into the Members table
INSERT INTO Members (join_date, mtype_id) VALUES
                                              (NOW(), 1),
                                              (NOW(), 2),
                                              (NOW(), 3);

-- Insert sample data into the Users table
INSERT INTO Users (name, username, email, password, trainer_id, member_id, role_id) VALUES
                                                                                        ('John Doe', 'john', 'john@example.com', 'password', 1, 1, 1),
                                                                                        ('Jane Smith', 'jane', 'jane@example.com', 'password', 2, 2, 2);

-- Insert sample data into the Manager table
INSERT INTO Manager (name, lastname, email, user_id) VALUES
    ('Manager', 'Smith', 'manager@example.com', 1);

-- Insert sample data into the Gym table
INSERT INTO Gym (location, open_hours, capacity, manager_id) VALUES
    ('Gym Location', NOW(), 100, 1);

-- Insert sample data into the Orders table
INSERT INTO Orders (order_Date, total_Amount, order_Status, user_id) VALUES
                                                                         (NOW(), 50.00, 'Completed', 1),
                                                                         (NOW(), 100.00, 'Pending', 2);

-- Insert sample data into the Products table
INSERT INTO Products (name, description, price, category, image, stock) VALUES
                                                                            ('Product 1', 'Description 1', 10.00, 'Category 1', 'image1.jpg', 100),
                                                                            ('Product 2', 'Description 2', 20.00, 'Category 2', 'image2.jpg', 200);

-- Insert sample data into the product_order table
INSERT INTO product_order (order_id, product_id, quantity) VALUES
                                                               (1, 1, '2'),
                                                               (2, 2, '1');

-- Insert sample data into the Payment table
INSERT INTO Payment (amount, date_time, user_id, order_id) VALUES
                                                               (50.00, NOW(), 1, 1),
                                                               (100.00, NOW(), 2, 2);

-- Insert sample data into the Workout_Plan table
INSERT INTO Workout_Plan (workout_timeDate, workout_type, member_id) VALUES
                                                                         (NOW(), 'Plan 1', 1),
                                                                         (NOW(), 'Plan 2', 2);

-- Insert sample data into the Offers table
INSERT INTO Offers (offerType, description, endDate, duration, discount, manager_id) VALUES
    ('Discount Offer', 'Description of offer', NOW(), NOW(), 10, 1);

-- Insert sample data into the Sponsors table
INSERT INTO Sponsors (companyName, sponsorType, manager_id) VALUES
    ('Sponsor Company', 'Type', 1);

-- Insert sample data into the Members_Class table
INSERT INTO Members_Class (member_id, class_id) VALUES
                                                    (1, 1),
                                                    (2, 2);

-- Insert sample data into the Trainer_Class table
INSERT INTO Trainer_Class (trainer_id, class_id) VALUES
                                                     (1, 1),
                                                     (2, 2);

-- Insert sample data into the Workout table
INSERT INTO Workout (name, description, class_id) VALUES
                                                      ('Workout 1', 'Description 1', 1),
                                                      ('Workout 2', 'Description 2', 2);

-- Insert sample data into the Personalized_Workout table
INSERT INTO Personalized_Workout (name, type, member_id) VALUES
                                                             ('Personalized Workout 1', 'Type 1', 1),
                                                             ('Personalized Workout 2', 'Type 2', 2);

-- Insert sample data into the Workout_PersonalizedWorkout table
INSERT INTO Workout_PersonalizedWorkout (workout_id, personalized_id) VALUES
                                                                          (1, 1),
                                                                          (2, 2);


