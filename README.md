# Doctor Booking Page
### Installation
```
yarn
```

### Run the code
```
yarn run start
```

### Run Test Case
```
// test changed files
yarn run test

// test all files
yarn run test:all

// test all files with coverage report
yarn run test:coverage
```


### Hosted Website Link
https://doctor-booking-kohl.vercel.app/doctor-list

### Choice of Package
1. React Query
It provides a variety of query feature which is very useful in most of the react application. Take this project as an example, Pagination can be easily implemented in Doctor List Page with react query (Not implemented in this project). The drawback is that the data fetched are not supposed be shared as global state of the system, RTK Query in Redux may be a better solution for that.

2. Styled-Component
Styled-Component is one of the popular CSS-in-JS framework. With CSS-in-JS, the naming collision issue is resolved. The styling of component can easily setup along with the props of components.

3. React Hook Form
React Hook Form is performance optimized library for form submission. The well-design hook function provides a comprehensive form related feature, such as validation, event handling and accessibility. It also save development time.

4. Axios
Axios is one of the famous Promise-based Client library. It provides an great interface for customize the HTTP request, such as timeout, retry, header setup.

### Potential Improvement
1. Setup cicd pipline
If there are collaborators, CICD pipeline should setup properly. For example, set up lint and testing pipeline when new branch is pushed.

2. Test Coverage
In this project, I have written a sample test case file. There should be a higher test coverage if the project continues. Belows are the suggested test case for existing code.
	- Unit Test
		- functions in `src/utils/time.test`
		- Booking Form

	- Integration Test
		- Doctor List Page
		- Doctor Profile Page

	- System Test
		- Run Cypress for core flow after deploy pipeline succeed

3. Better User Experience Design
		- As the project is supposed to be completed in a short period of time, I put more effort in code implementation and tech planning. The UI/UX design is relatively weak in this project. More case study on the similar project should be considered (e.g. Openrice, Hotel.com).

4. Event/Error tracking Integration
Integrate event tracking allows PM and stakeholder to review the user interaction, which can reflect the quality feature/project and make improvement. Some bugs are not easily to found in testing environment, having error tracking allows developer to monitor the existing bugs on production.

5. Mobile Responsive
Due to limited time, there is no mobile design in this project.

###Production consideration
1.  API KEY
Although API Key is stored in environment file, it is still exposed to the client as it is used for api call in client side. Rate limiting should be implemented in backend

2. Set up staging environment
Setup staging environment for QA to undergo pre-release test before deploying to production.

3. Rollback Operation
Should implement a easier rollback operation in your CICD tool in case of any production failures

### Assumptions
- The response are assumed to be included valid data without corrupted data. For example, doctor.opening_hours[x].day must be `MON | TUE | WED | THU | FRI | SAT | SUN `
- `GET /doctor` should respond limited doctor records. Otherwise, pagination should be supported in request param to avoid overloading payload.
- The last booking slot is 30 minutes before the closing hours. The client is not supposed to book an appointment when the clinic is closing.
- The description of doctor is not available in database. As there is no description found in each doctor data can be found. So the doctor profile page doesn't include any doctor description.
- Client name is the only identifier required for the booking system and any guest can use the booking system






