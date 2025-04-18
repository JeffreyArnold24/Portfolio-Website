"use client";

const get_inventory = async() => {
  
    var url = process.env.NEXT_PUBLIC_URL
    var port = process.env.NEXT_PUBLIC_RAILS_PORT
    var username = localStorage.getItem('username')
    var authToken = localStorage.getItem('authToken')

    var userRole = "admin"
    var department = "IT"
    const response = await fetch(url + port + "/inventory_data?username=" + username + "&auth_token=" + authToken + "&user_role=" + userRole + "&department" + department, {
      method: "GET",
    });
    const data = await response.json();
    console.log(data)
    return data
  
  }

export {get_inventory}