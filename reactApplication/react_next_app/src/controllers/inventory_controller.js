"use client";

const get_inventory = async(role, department) => {
  
  var url = process.env.NEXT_PUBLIC_URL
  var port = process.env.NEXT_PUBLIC_RAILS_PORT
  var username = localStorage.getItem('username')
  var authToken = localStorage.getItem('authToken')

  const fullURL = url + port + "/inventory_data?username=" + username + "&auth_token=" + authToken + "&user_role=" + role + "&department" + department
  const response = await fetch(fullURL, {
    method: "GET",
  });
  if (response.ok){
    const data = await response.json();
    return data
  }
  else {
    return []
  }
  
}

const submit_new_inventory_item = async(item) => {
  
  var url = process.env.NEXT_PUBLIC_URL
  var port = process.env.NEXT_PUBLIC_RAILS_PORT
  var username = localStorage.getItem('username')
  var authToken = localStorage.getItem('authToken')

  const fullURL = url + port + "/inventory_data?username=" + username + "&auth_token=" + authToken
  const response = await fetch(fullURL, {
    method: "POST",
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      inventory: {
        Id: item.Id,
        Name: item.Name,
        Type: item.Type,
        Status: item.Status,
        Created_Date: item.Created_Date,
        Assigned_User: item.Assigned_User,
        Department: item.Department
      }
    })
  });
  if (response.ok){
    const data = await response.json();
    console.log(data)
    return data
  }
  else {
    return
  }
  
}

const update_inventory_item = async() => {
  
  var url = process.env.NEXT_PUBLIC_URL
  var port = process.env.NEXT_PUBLIC_RAILS_PORT
  var username = localStorage.getItem('username')
  var authToken = localStorage.getItem('authToken')

  console.log(url + port + "/inventory_data?username=" + username + "&auth_token=" + authToken + "&user_role=" + role + "&department" + department)
  const response = await fetch(url + port + "/inventory_data?username=" + username + "&auth_token=" + authToken + "&user_role=" + role + "&department" + department, {
    method: "PUT",
  });

  if (response.ok){
    const data = await response.json();
    console.log(data)
    return data
  }
  else {
    console.log("failed")
    return
  }
  
}

export {get_inventory, submit_new_inventory_item, update_inventory_item}