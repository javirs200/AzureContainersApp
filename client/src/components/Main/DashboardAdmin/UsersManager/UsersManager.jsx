import React, { useState, useEffect } from "react";
import Listado from '../../../../utils/Listado';
import FetchUtil from "../../../../utils/FetchUtil/FetchUtil";

import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import Select from "@mui/material/Select";
import MenuItem from "@mui/material/MenuItem";
import Button from "@mui/material/Button";
import UpdateIcon from "@mui/icons-material/Cached"

const UsersManager = () => {

  const { fetchDeleteUser,fetchUsers,fetchEditUser } = FetchUtil;

  const [users, setUsers] = useState([]);
  const [selectRole, setSelectRole] = useState('');
  const [selectEmail, setSelectEmail] = useState('');

  useEffect(() => {
    fetchUsers().then((data) => setUsers(data));
  }, [])

  const handleSubmit = (e) => {
    e.preventDefault()
    const updateUser = async () => {
      const edit = { email: selectEmail, role: selectRole }
      // console.log(edit);
      try {
        const response = await fetchEditUser(edit)
        if (response.status === 200) {
          let data = await response.json()
          alert('usuario actualizado')
          // console.log("ok update , data api -> ", data);
          fetchUsers()
        } else {
          let data = await response.json()
          alert('error usuario no actualizado')
          console.log("data api -> ", data);
        }

      } catch (error) {
        console.log(error);
      }



    }
    updateUser()
  }

  const handleSubmitDelete = (e) => {
    e.preventDefault()
    const deleteUser = async () => {
      // console.log(edit);
      try {
        const response = await fetchDeleteUser(selectEmail);
        if (response.status === 200) {
          let data = await response.json()
          alert('usuario borrado')
          console.log("ok delete , data api -> ", data);
          fetchUsers()
        } else {
          let data = await response.json()
          alert('error usuario no borrado')
          console.log("data api -> ", data);
        }

      } catch (error) {
        console.log(error);
      }
    }
    deleteUser()
  }


  useEffect(() => {
    console.log('reload list');
  }, [users])


  const addSelectItems = () => {
    return users.map((e, i) => {
      return <MenuItem key={i} value={e.email}>{e.email}</MenuItem>
    })
  }

  return (
    <>
      <section className="users">
        <Listado title={'Usuarios'} elementos={users} mode={1} />
      </section>
      <section className="usersControls">
        <form onSubmit={handleSubmit} className="form_privileges">
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="emailSelectLabel">Email</InputLabel>
            <Select
              required
              labelId="emailSelectLabel"
              id="EmailSelect"
              value={selectEmail}
              onChange={(e) => setSelectEmail(e.target.value)}
              label="Email"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              {addSelectItems()}
            </Select>
          </FormControl>
          <FormControl variant="standard" sx={{ m: 1, minWidth: 120 }}>
            <InputLabel id="roleSelectLabel">Role</InputLabel>
            <Select
              required
              labelId="roleSelectLabel"
              id="roleSelect"
              value={selectRole}
              onChange={(e) => setSelectRole(e.target.value)}
              label="Role"
            >
              <MenuItem value="">
                <em>None</em>
              </MenuItem>
              <MenuItem value={'driver'}>Driver</MenuItem>
              <MenuItem value={'admin'}>Admin</MenuItem>
            </Select>
          </FormControl>

          <Button variant="contained" type="submit" endIcon={<UpdateIcon />}>Update User</Button>
        </form>

        <form onSubmit={handleSubmitDelete} className="form_Delete">
          <Button variant="outlined" type="submit" color="error">Delete User</Button>
        </form>
      </section>
    </>

  );
};

export default UsersManager;
