const services = require('../services');
const { BadRequestError, InternalServerError } = require('../errors');
const joi = require('joi');
const {} = require('../helpers/joi_schema');
const {getAllProjects} = require('../controllers/project')


//GET method
describe('getAllProjects function', () => {
  it('should return a 200 response with the correct data', async () => {
    // Arrange  
    const req = { query: { /* Add any necessary query parameters */ } };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedResponse = { /* Add the expected response object here */ };

    // Mock the services.getAllProjects function to return the expected response
    services.getAllProjects = jest.fn().mockResolvedValue(expectedResponse);

    // Act
    await getAllProjects(req, res);

    // Assert
    expect(res.status).toHaveBeenCalledWith(200);
    expect(res.json).toHaveBeenCalledWith(expectedResponse);
  });

  it('should throw an error if getAllProjects function returns an error', async () => {
    // Arrange
    const req = { query: {} };
    const res = { status: jest.fn().mockReturnThis(), json: jest.fn() };
    const expectedError = new Error('Test error');
  
    // Mock the services.getAllProjects function to throw an error
    services.getAllProjects = jest.fn().mockRejectedValue('Test error');
  
    // Act & Assert
    try {
      await getAllProjects(req, res);
      // If the function does not throw an error, the test should fail
      fail('Expected an error to be thrown');
    } catch (error) {
      expect(error).toEqual(expectedError);
    }
  });
});
