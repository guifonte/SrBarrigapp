const frisby = require('frisby');

it ('Homepage should be up', function () {
    return frisby
      .get('http://localhost:4200/')
      .expect('status', 200);
  });

  it ('Login with this credentials should not be successful', function () {
    return frisby
      .post('http://localhost:3000/api/user/login', {
        email: "barancynthia@gmail.com",
        password: "unicamp",
        firstName: null,
        lastName: null })
      .expect('status', 401);
  });

  it ('Login with this credentials should be successful', function () {
    return frisby
      .post('http://localhost:3000/api/user/login', {
        email: "barancynthia@gmail.com",
        password: "osatoehtop",
        firstName: null,
        lastName: null })
      .expect('status', 200);
  });

  it ('Should create a new group', function () {
    return frisby
      .post('http://localhost:3000/api/groups/', {
          id:null,
          name:"Testeeee",
          members:[{
              userId:"5b291f900ea6400fd095141c",
              firstName:"Sato",
              lastName:"Muleke",
              email:"g@gmail.com"}
            ],
        adminId:"5b2ff8c2329f98094c94d39e",
        isOpen:true})
      .expect('status', 201);
  });

  
  it ('This should add a new spending', function () {
    return frisby
      .post('http://localhost:3000/api/spendings', {
          id:null,
          value:200,
          description:"Descricao teste",
          payerFirstName:null,
          payerLastName:null,
          date:"2018-06-28T05:24:29.903Z",
          creatorId:null,
          groupId:"5b31404433056e0bffc8e8d6",
          shareList:[{
              userId:"5b293dfd5a448f245363a2a4",
              firstName:"Cynthia",
              lastName:"Baran",
              email:"c@gmail.com" },
              {userId:"5b291f900ea6400fd095141c",
              firstName:"Sato",
              lastName:"Muleke",
              email:"g@gmail.com"}]
        })
      .expect('status', 201);
  });


  




  