CREATE TABLE IF NOT EXISTS "User" (
    "userID" SERIAL PRIMARY KEY,
    "userName" VARCHAR(50) NOT NULL,
    "userPass" VARCHAR(255) NOT NULL
);

CREATE TABLE IF NOT EXISTS "Appointment" (
    "appointmentID" SERIAL PRIMARY KEY,
    "userID" INTEGER NOT NULL,
    "date" TIMESTAMP NOT NULL,
    "testType" VARCHAR(50) NOT NULL,
    FOREIGN KEY ("userID") REFERENCES "User"("userID")
);
