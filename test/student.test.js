const services = require("../services");
const { BadRequestError, InternalServerError } = require("../errors");
const joi = require("joi");
const { getAllStudent, deleteStudent, updateStudent, getAllStudentPaging, updateProfile } = require("../controllers/student");

//GET method
describe("getAllStudent function", () => {
  it("should return a 200 response with the correct data", async () => {
    // Arrange
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedResponse = {
      /* Add the expected response object here */
    };

    // Mock the services.getAllStudent function to return the expected response
    services.getAllStudent = jest.fn().mockResolvedValue(expectedResponse);

    // Act
    await getAllStudent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("should throw an error if getAllStudent function returns an error", async () => {
    // Arrange
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedError = new Error("Test error");

    // Mock the services.getAllStudent function to throw an error
    services.getAllStudent = jest.fn().mockRejectedValue("Test error");

    // Act & Assert
    try {
      await getAllStudent(req, res);
      // If the function does not throw an error, the test should fail
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });
});

//GET method by Id
describe("getAllStudent function", () => {
  it("should return a 200 response with the correct data", async () => {
    // Arrange
    const student_id = "V2sSC1HSLASNtTT0RhzwqDxxwri2";
    const req = { query: { student_id: student_id } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedResponse = {
      /* Add the expected response object here */
    };

    // Mock the services.getAllStudent function to return the expected response
    services.getAllStudent = jest.fn().mockResolvedValue(expectedResponse);

    // Act
    await getAllStudent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it("should throw an error if get student by id function returns an error", async () => {
    // Arrange
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedError = new Error("Test error");

    // Mock the services.getAllStudent function to throw an error
    services.getAllStudent = jest.fn().mockRejectedValue("Test error");

    // Act & Assert
    try {
      await getAllStudent(req, res);
      // If the function does not throw an error, the test should fail
      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });
});

describe("deleteStudent function", () => {
  it("should return a 200 response with the correct data", async () => {
    // Arrange
    const student_ids = ["V2sSC1HSLASNtTT0RhzwqDxxwri2"];
    const req = { user: { student_id: "12345" }, query: { student_ids } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedResponse = { message: "Student deleted successfully" };

    // Mock the services.deleteStudent function to return the expected response
    services.deleteStudent = jest.fn().mockResolvedValue(expectedResponse);

    // Act
    await deleteStudent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

it("should throw an error if delete student function returns an error", async () => {
  // Arrange
  const student_ids = ["V2sSC1HSLASNtTT0RhzwqDxxwri2"];
  const req = { user: { student_id: "12345" }, query: { student_ids } };
  const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
  const expectedError = new Error("Test error");

  // Mock the services.deleteStudent function to throw an error
  services.deleteStudent = jest.fn().mockRejectedValue("Test error");

  // Act & Assert
  try {
    await deleteStudent(req, res);
    // If the function does not throw an error, the test should fail
    fail("Expected an error to be thrown");
  } catch (error) {
    expect(error).toEqual(expectedError);
  }
});


// getAllStudentPaging
describe('getAllStudentPaging function', () => {
  it('should return a 200 response with the correct data', async () => {
    // Arrange  
    const req = { query: {}, user: { role_name: 'admin' } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedResponse = { /* Add the expected response object here */ };

    // Mock the services.getAllStudentPaging function to return the expected response
    services.getAllStudentPaging = jest.fn().mockResolvedValue(expectedResponse);

    // Act
    await getAllStudentPaging(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });
});

describe('updateStudent function', () => {
  it('should return a 200 response with the updated student data', async () => {
    // Arrange
    const req = {
      body: {
        student_id: 'V2sSC1HSLASNtTT0RhzwqDxxwri2',
        // other fields to update
      }
    };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedResponse = { /* Add the expected response object here */ };

    // Mock the services.updateStudent function to return the expected response
    services.updateStudent = jest.fn().mockResolvedValue(expectedResponse);
  
    // Act
    await updateStudent(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

})

describe('updateProfile', () => {
  it('should return status 200 with updated profile information', async () => {
    const mockReq = {
      body: {
        name: 'John Doe',
        email: 'johndoe@example.com',
        password: 'password123',
      },
      user: { student_id: 1 },
    };

    const mockRes = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };

    const mockUpdateProfile = jest.spyOn(services, 'updateProfile');
    mockUpdateProfile.mockResolvedValueOnce({
      message: 'Profile updated successfully',
      data: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    });

    await updateProfile(mockReq, mockRes);

    expect(mockUpdateProfile).toHaveBeenCalledWith(
      mockReq.body,
      mockReq.user.student_id
    );

    expect(mockRes.status).toHaveBeenCalledWith(200);
    expect(mockRes.json).toHaveBeenCalledWith({
      message: 'Profile updated successfully',
      data: {
        id: 1,
        name: 'John Doe',
        email: 'johndoe@example.com',
      },
    });
  });

})