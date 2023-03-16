## Contributing

Developers are required to read through the general coding guidelines and follow the proper coding standard and conventions.

## Github

Guidelines to follow when contributing to the Food Loops codebase

### Branch Naming Convention

- Branch name should exactly match with the corresponding ClickUp task id that you will be working on. `<task-id>-<short description>`

- If the task has not yet been created then the reader should know the problem being addressed by reading the branch name. Keep it short.
  - Features should follow: `feature-<short-new-feature-description>`
  - Bugs should follow: `bug-<short-bug-description>`
- Make sure to pull from the parent branch before branching out.

### Branching Strategy

Main Branches:

- master (Production)
- dev (Development)
- qa (QA)

The following convention should be followed:

- Every branch should be a branch of `dev` and should be merged to `dev` after **PR** is reviewed
- Every feature, task is done in a separate branch named according to the **ClickUp** task name and id.
- Any critical bug after production release is done via hotfix branches. It is branched off from master and merged back to master and dev after it’s done.

### Commits

- Commits should be for related changes. They should address one and only one logical problem/bug. One commit should not address several issues.
- Do not commit uncompleted work.
- **Write good commit messages.**
  - They should be 50 characters max.
  - Use the imperative. Eg. "**Allow** scheduling appointments" and not "Allowed scheduling appointments" or "Allows scheduling appointments."

### Pull Request Best Practices

Best Practices:

- Pull Request should atleast be reviewed by 1 person before merging it to the base branch.
  Only comment author can resolve comment – if code was corrected or after discussion author decides to fix it.
- Don’t mention the same problem many times. Don’t bloat the code, say it once and ask to fix everywhere.
- If there are pending, not resolved comments, the assignee is a code author who should fix or comment back.
- If there are discussions commented by the code author, the assignee is reviewer, who should continue a discussion or resolve comments and approve.
- Use labels to mark what actions should be next – e.g. needs review, Reviewed By... etc.

## REST API Convention

In REST(REpresentational State Transfer), primary data representation is called Resource. Having a strong and consistent REST resource naming strategy – will definitely prove one of the best design decisions in the long term.

- Use noun and hyphenated-lower-case for CRUD operations to an entity/resource/document. The GET/POST/PUT/DELETE/PATCH requests represents the corresponding CRUD operation for the following resources like employees, reports, leaves.

  ```
  /employees
  /employees/{employee-id}/leaves
  /employees/{employee-id}/employee-reports
  ```

- For cases of executable functions besides a basic CRUD operations, use verb and hyphenated-lower-case.

  ```
  /customer/{customer-id}/check-validity
  /customer/{customer-id}/cart/checkout
  ```

- Use forward slash (/) to indicate hierarchical relationships

  ```
  /customers/{customer-id}/accounts/{account-id}/balance /category/{cateogry-id}/products/{product-id}/balance
  ```

- Do not use trailing forward slash (/) in URIs

  ```
  /employees //Good practice
  /employees/{employee-id}/leaves/ //Bad practice
  ```

- Use hyphens (-) to improve the readability of URIs

  ```
  /employees/{employee-id}/employee-reports //Readable

  /customer/{customer-id}/check-validity //Readable

  /employees/{employee-id}/employeeReports //Less Readable

  /customer/{customer-id}/checkValidity //Less Readable
  ```

- Do not use file extentions and underscores

  ```
  /employees/{employee-id}/employee-reports.pdf /Bad Practice/
  /employees/{employee-id}/employee_reports /Bad Practice/
  ```

- Never use CRUD function names in URIs

- URIs should not be used to indicate that a CRUD function is performed. URIs should be used to uniquely identify resources and not any action upon them. HTTP request methods should be used to indicate which CRUD function is performed.

  ```
  GET Request /employees // Get all employees
  POST Request /employees // Create new employees
  GET Request /employees/{employee-id} // Get one employee with given id
  PUT Request /employees/{employee-id} // Update one employee with given id
  DELETE Request /employees/{employee-id} // Delete one employee with given id
  ```

### Response formating

We use <a href="https://github.com/omniti-labs/jsend">JSend</a> standard as a specification for sending JSON responses from web servers should be formatted.

- Success response

  ```json
  {
    "status": "success",
    "data": {
      "post": { "id": 1, "title": "A blog post", "body": "Some useful content" }
    }
  }
  ```

  ```json
  {
    "status": "success",
    "data": {
      "count": 2,
      "posts": [
        { "id": 1, "title": "A blog post", "body": "Some useful content" },
        { "id": 2, "title": "Another blog post", "body": "More content" }
      ]
    }
  }
  ```

- Failed response

  ```json
  {
    "status": "fail",
    "message": "Unable to communicate with database"
  }
  ```
