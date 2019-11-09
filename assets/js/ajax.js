
import store from './store';

export function post(path, body) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'post',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => resp.json());
}

export function put(path, body) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'put',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
    body: JSON.stringify(body),
  }).then((resp) => console.log(resp.json()));
}


export function get(path) {
  let state = store.getState();
  let token = state.session && state.session.token;

  return fetch('/ajax' + path, {
    method: 'get',
    credentials: 'same-origin',
    headers: new Headers({
      'x-csrf-token': window.csrf_token,
      'content-type': "application/json; charset=UTF-8",
      'accept': 'application/json',
      'x-auth': token || "",
    }),
  }).then((resp) => resp.json());
}





export function list_tasks() {
  var resp =  get('/tasks').then((resp)=>{
    return resp;
  } );

  return resp.then((r) => r)

}

export function list_jobs() {
  var  resp =  get('/jobs').then((resp)=>{
    //console.log(resp);
    return resp;
  } );

  return resp.then((r) => r)

}


export function update_task(form) {
  //console.log("inside the update task");
let localStore = store.getState();
let managerId = localStore.session;
if(managerId == null){
  alert("kindly Login");
  return;
}
managerId = localStore.session.user_id;
if(managerId != 1){
   alert("You dont have the access");
   return;
}

let data = form;
console.log("data " +  form.id);
console.log("data " +  form.job_code);
console.log("data " +  form.approved);
put('/tasks/' + form.id, {
  task: {
    id: data.id,
    job_code: data.jobcode,
    approved: true,
    hours: data.hours,
  }})
  .then(() => {
    console.log("hijhjh");
    form.redirect('/tasks/index');
  });
}


export function submit_task(form) {
    console.log("inside the submit task");
  let state = store.getState();
  let data = state.forms.new_task;
 console.log("data " +  state.forms.new_task);
 console.log("data " +  data.hours);
 let managerId = state.session.user_id;
 console.log("data " +  managerId);
  post('/tasks', {
    task: {
      job_code: data.jobcode,
      approved: false,
      hours: data.hours,
      manager: managerId,
    }})
    .then((resp) => {
      console.log(resp);
      if (resp.data) {
        store.dispatch({
          type: 'CHANGE_NEW_TASK',
          data: {errors: JSON.stringify("submitted successfully")},
        });
      }
      else {
        store.dispatch({
          type: 'CHANGE_NEW_TASK',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}

export function submit_login(form) {
    console.log("inside the ajax");
  let state = store.getState();
  let data = state.forms.login;
 console.log("data " +  data);
  post('/sessions', data)
    .then((resp) => {
      console.log(resp);
      if (resp.token) {
        localStorage.setItem('session', JSON.stringify(resp));
        store.dispatch({
          type: 'LOG_IN',
          data: resp,
        });
        form.redirect('/tasks/new');
      }
      else {
        store.dispatch({
          type: 'CHANGE_LOGIN',
          data: {errors: JSON.stringify(resp.errors)},
        });
      }
    });
}
