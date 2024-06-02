import { toast } from 'react-toastify';

// This function handles errors thrown by Prisma threw Zenstack custom hooks, and outputs a useful message to the console and displays a toast notification.
// eslint-disable-next-line @typescript-eslint/no-explicit-any
export default function prismaErrorHandler (error: any) {
  let displayedErrorMessage = 'An error occurred. Please contact your system administrator.';
  let errorInfo = {code: 'unknown', message: 'An unknown error occurred with Prisma or Zenstack.'};

  // checking for Prisma error types does not work here as the error is modified at some point during the Zenstack custom hook functionality
  // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
  if (error?.info?.code) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
      errorInfo = error.info;
      // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
      switch (error.info.code) {
          case 'P1000':
            displayedErrorMessage = "Authentication failed against the database. Please check your connection credentials.";
            break;
          case 'P1001':
            displayedErrorMessage = "Database server was unable to be reached. Please check if the database is running.";
            break;
          case 'P1002':
            displayedErrorMessage = "The database operation timed out. Please try again later.";
            break;
          case 'P1003':
            displayedErrorMessage = "The database server does not support the specified database version. Please verify your database setup.";
            break;
          case 'P1008':
            displayedErrorMessage = "The operation was aborted due to a database connection failure. Please try again.";
            break;
          case 'P1009':
            displayedErrorMessage = "The database command was interrupted. Please ensure the database is accessible and try again.";
            break;
          case 'P1010':
            displayedErrorMessage = "User authentication failed. Please verify your credentials.";
            break;
          case 'P1011':
            displayedErrorMessage = "Error opening a TLS connection. Please ensure the TLS settings are correct.";
            break;
          case 'P1012':
            displayedErrorMessage = "The database does not exist. Please verify the database name.";
            break;
          case 'P1013':
            displayedErrorMessage = "The Prisma schema is invalid. Please review your schema file.";
            break;
          case 'P1014':
            displayedErrorMessage = "A migration failed. Please review the migration logs for details.";
            break;
          case 'P1015':
            displayedErrorMessage = "Your Prisma schema is not in sync with your database schema. Please run 'prisma db pull' to update your schema.";
            break;
          case 'P1016':
            displayedErrorMessage = "The database schema has changed since the last migration. Please ensure all migrations have been applied.";
            break;
          case 'P2000':
            displayedErrorMessage = "The value provided for the column is too long for the column's type. Please check your input values.";
            break;
          case 'P2001':
            displayedErrorMessage = "The record was not found. Please verify your query criteria.";
            break;
          case 'P2002':
            displayedErrorMessage = "A unique constraint violation occurred. The value already exists in the database.";
            break;
          case 'P2003':
            displayedErrorMessage = "A foreign key constraint violation occurred. Please check the related records.";
            break;
          case 'P2004':
            displayedErrorMessage = "A constraint failed on the database. Please review the constraint details.";
            break;
          case 'P2005':
            displayedErrorMessage = "Invalid value provided for a column. Please check the data type and format.";
            break;
          case 'P2006':
            displayedErrorMessage = "The provided value is not valid for the field's type. Please check your input.";
            break;
          case 'P2007':
            displayedErrorMessage = "The data in the database is invalid for the query. Please verify your database integrity.";
            break;
          case 'P2008':
            displayedErrorMessage = "The provided query is invalid. Please check the query syntax.";
            break;
          case 'P2009':
            displayedErrorMessage = "The data retursned for the query is invalid. Please verify your query and data.";
            break;
          case 'P2010':
            displayedErrorMessage = "Raw query execution failed. Please check the raw query syntax and parameters.";
            break;
          case 'P2011':
            displayedErrorMessage = "Null constraint violation. A required field is missing a value.";
            break;
          case 'P2012':
            displayedErrorMessage = "Missing required argument. Please provide all required fields.";
            break;
          case 'P2013':
            displayedErrorMessage = "Invalid argument provided. Please check the argument values and types.";
            break;
          case 'P2014':
            displayedErrorMessage = "A relationship constraint failed. Please check the related records.";
            break;
          case 'P2015':
            displayedErrorMessage = "A related record was not found. Please verify the relationship references.";
            break;
          case 'P2016':
            displayedErrorMessage = "Query interpretation error. Please check the query syntax and data.";
            break;
          case 'P2017':
            displayedErrorMessage = "The records required for the query were not found. Please verify your query criteria.";
            break;
          case 'P2018':
            displayedErrorMessage = "The required connection to the database was not found. Please check your database configuration.";
            break;
          case 'P2019':
            displayedErrorMessage = "The input provided for the query is invalid. Please verify your query parameters.";
            break;
          case 'P2020':
            displayedErrorMessage = "The operation was aborted due to a conflict. Please retry the operation.";
            break;
          case 'P2021':
            displayedErrorMessage = "The requested resource was not found. Please verify your request.";
            break;
          case 'P2022':
            displayedErrorMessage = "A data integrity violation occurred. Please check your data for consistency.";
            break;
          case 'P2023':
            displayedErrorMessage = "A resource is in use and cannot be modified. Please retry the operation later.";
            break;
          case 'P2024':
            displayedErrorMessage = "The database connection was lost. Please check your network and database server.";
            break;
          default:
            displayedErrorMessage = "An unknown error occurred. Please contact your system administrator.";
            break;
        }
    }
    console.error(`${displayedErrorMessage} Prisma Error Code: ${errorInfo.code}. Error Message: ${errorInfo.message}`, errorInfo);
    toast.error(displayedErrorMessage);
}