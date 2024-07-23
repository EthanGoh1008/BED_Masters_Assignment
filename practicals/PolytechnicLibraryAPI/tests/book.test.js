// book.test.js
const Book = require("../models/book");
const sql = require("mssql");

jest.mock("mssql"); // Mock the mssql library

describe("Book.getAllBooks", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should retrieve all books from the database", async () => {
    const mockBooks = [
      {
        id: 1,
        title: "The Lord of the Rings",
        author: "J.R.R. Tolkien",
        availability: "Y",
      },
      {
        id: 2,
        title: "The Hitchhiker's Guide to the Galaxy",
        author: "Douglas Adams",
        availability: "N",
      },
    ];

    const mockRequest = {
      query: jest.fn().mockResolvedValue({ recordset: mockBooks }),
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined),
    };

    sql.connect.mockResolvedValue(mockConnection); // Return the mock connection

    const books = await Book.getAllBooks();

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockConnection.close).toHaveBeenCalledTimes(1);
    expect(books).toHaveLength(2);
    expect(books[0]).toBeInstanceOf(Book);
    expect(books[0].id).toBe(1);
    expect(books[0].title).toBe("The Lord of the Rings");
    expect(books[0].author).toBe("J.R.R. Tolkien");
    expect(books[0].availability).toBe("Y");
    // ... Add assertions for the second book
  });

  it("should handle errors when retrieving books", async () => {
    const errorMessage = "Database Error";
    sql.connect.mockRejectedValue(new Error(errorMessage));
    await expect(Book.getAllBooks()).rejects.toThrow(errorMessage);
  });
});

describe("Book.updateBookAvailability", () => {
  beforeEach(() => {
    jest.clearAllMocks(); // Clear mock calls before each test
  });

  it("should update the availability of a book", async () => {
    const mockBookId = 1;
    const newAvailability = "Y";
    const mockBook = {
      id: mockBookId,
      title: "The Lord of the Rings",
      author: "J.R.R. Tolkien",
      availability: newAvailability,
    };

    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest
        .fn()
        .mockResolvedValue({ rowsAffected: [1], recordset: [mockBook] }),
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined),
    };

    sql.connect.mockResolvedValue(mockConnection); // Return the mock connection

    const result = await Book.updateBookAvailability(
      mockBookId,
      newAvailability
    );

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRequest.input).toHaveBeenCalledWith("id", mockBookId);
    expect(mockRequest.input).toHaveBeenCalledWith(
      "availability",
      newAvailability
    );
    expect(mockRequest.query).toHaveBeenCalledWith(
      "UPDATE Books SET availability = @availability WHERE id = @id; SELECT * FROM Books WHERE id = @id;"
    );
    expect(result).toEqual(mockBook);
  });

  it("should return null if book with the given id does not exist", async () => {
    const mockBookId = 999; // Non-existent book ID
    const newAvailability = "Y";

    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockResolvedValue({ rowsAffected: [0], recordset: [] }),
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined),
    };

    sql.connect.mockResolvedValue(mockConnection); // Return the mock connection

    const result = await Book.updateBookAvailability(
      mockBookId,
      newAvailability
    );

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRequest.input).toHaveBeenCalledWith("id", mockBookId);
    expect(mockRequest.input).toHaveBeenCalledWith(
      "availability",
      newAvailability
    );
    expect(mockRequest.query).toHaveBeenCalledWith(
      "UPDATE Books SET availability = @availability WHERE id = @id; SELECT * FROM Books WHERE id = @id;"
    );
    expect(result).toBeNull();
  });

  it("should throw an error if there is a database error", async () => {
    const mockBookId = 1;
    const newAvailability = "Y";
    const errorMessage = "Database Error";

    const mockRequest = {
      input: jest.fn().mockReturnThis(),
      query: jest.fn().mockRejectedValue(new Error(errorMessage)),
    };
    const mockConnection = {
      request: jest.fn().mockReturnValue(mockRequest),
      close: jest.fn().mockResolvedValue(undefined),
    };

    sql.connect.mockResolvedValue(mockConnection); // Return the mock connection

    await expect(
      Book.updateBookAvailability(mockBookId, newAvailability)
    ).rejects.toThrow(errorMessage);

    expect(sql.connect).toHaveBeenCalledWith(expect.any(Object));
    expect(mockRequest.input).toHaveBeenCalledWith("id", mockBookId);
    expect(mockRequest.input).toHaveBeenCalledWith(
      "availability",
      newAvailability
    );
    expect(mockRequest.query).toHaveBeenCalledWith(
      "UPDATE Books SET availability = @availability WHERE id = @id; SELECT * FROM Books WHERE id = @id;"
    );
  });
});
