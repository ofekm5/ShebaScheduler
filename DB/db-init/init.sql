CREATE TABLE IF NOT EXISTS "User" (
    "userID" SERIAL PRIMARY KEY,
    "userName" VARCHAR(10) NOT NULL,
    "userPass" VARCHAR(20) NOT NULL,
    "fullname" VARCHAR(20) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Appointment" (
    "appointmentID" SERIAL PRIMARY KEY,
    "userID" VARCHAR(255) NOT NULL,
    "date" VARCHAR(8) NOT NULL,
    "hour" VARCHAR(2) NOT NULL,
    "testType" VARCHAR(10) NOT NULL,
    FOREIGN KEY ("userID") REFERENCES "Users"("userID")
);