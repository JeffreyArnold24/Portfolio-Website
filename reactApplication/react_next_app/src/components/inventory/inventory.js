import React, { useState, useEffect } from 'react';
import { get_inventory, submit_new_inventory_item, update_inventory_item, delete_inventory_item } from "@/controllers/inventory_controller";
import { FaEdit, FaSave, FaTimes, FaTrash } from 'react-icons/fa';
import styles from './inventory.css'

export default function Inventory() {
  const [inventory, setInventory] = useState([]);
  const [form, setForm] = useState({
    Id: '',
    Name: '',
    Type: '',
    Status: '',
    Assigned_User: '',
    Department: '',
  });
  const [role, setRole] = useState('admin');
  const [department, setDepartment] = useState('Operations');
  const [error, setError] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [editedItem, setEditedItem] = useState({});

  const [departments, setDepartments] = useState([
    'Operations',
    'Accounting',
    'IT',
    'Sales',
    'HR',
  ]);

  const [sortConfig, setSortConfig] = useState({ key: 'Id', direction: 'asc' });

    // Fetch inventory items based on role and department
    const fetchInventory = async (role, department) => {
        try {
            const items = await get_inventory(role, department)
            setInventory(items)
        } catch (error) {
          console.error('Error fetching inventory:', error);
        }
    };
    
    useEffect(() => {
        fetchInventory(role, department);
    }, [role, department]);
    
    // Handle input change
    const handleChange = (e) => {
        setForm({ ...form, [e.target.name]: e.target.value });
    };
    
    // Submit a new item
    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await submit_new_inventory_item(form)
            setError('')
            setForm({ Id: '', Name: '', Type: '', Status: '', Assigned_User: '', Department: form.Department});
            fetchInventory(role, department);
        } catch (error) {
            setError(error.message)
        }
    };

    // Edit an existing item
    const handleEditClick = async (item) => {
        setEditingId(item.Id);
        setEditedItem(item);
    };

    // Cancel the edit and reset the information
    const handleCancelEdit = () => {
        setEditingId(null);
        setEditedItem({});
    };

    // Sets the data for the edited item
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setEditedItem((prev) => ({
            ...prev,
            [name]: value,
        }));
    };

    // Saves the updated item on the back-end
    const handleSaveEdit = async () => {
        try {
            await update_inventory_item(editedItem)
            setEditingId(null);
            setEditedItem({});
            fetchInventory(role, department);
          } catch (err) {
            console.error("Edit error:", err);
          }
    };

    // Delete an existing item
    const handleDelete = async (id) => {
        try {
            await delete_inventory_item(id)
            setError('')
            fetchInventory(role, department);
        } catch (error) {
            setError(error.message)
        }
    };

    // Sorts the table based on the given key.
    const handleSort = (key) => {
        setSortConfig((prevConfig) => {
            if (prevConfig.key === key) {
            return {
                key,
                direction: prevConfig.direction === 'asc' ? 'desc' : 'asc',
            };
            }
            return { key, direction: 'asc' };
        });
    };

    const sortedInventory = React.useMemo(() => {
        if (!sortConfig.key) return inventory;
        
        return [...inventory].sort((a, b) => {
            const aVal = a[sortConfig.key];
            const bVal = b[sortConfig.key];
        
            if (aVal < bVal) return sortConfig.direction === 'asc' ? -1 : 1;
            if (aVal > bVal) return sortConfig.direction === 'asc' ? 1 : -1;
            return 0;
        });
    }, [inventory, sortConfig]);

    return (
        <div className = "inventory_main_container">
            <h1>Inventory Management</h1>

            <div className= "role-department-selectors">
                <div className="user_role_selector">
                    <label>User Role: </label>
                    <select
                    value={role}
                    onChange={(e) => setRole(e.target.value)}
                    className="role_selector"
                    >
                    <option value="admin">Admin</option>
                    <option value="auditor">Auditor</option>
                    <option value="manager">Manager</option>
                    <option value="technician">Technician</option>
                    <option value="employee">Employee</option>
                    </select>
                </div>

                <div className="department_selector">
                    <label>Department: </label>
                    <select
                    value={department}
                    onChange={(e) => setDepartment(e.target.value)}
                    className="department_selector"
                    >
                    {departments.map((dep) => (
                    <option key={dep} value={dep}>
                        {dep}
                    </option>
                    ))}
                    </select>
                </div>
            </div>

            {showForm && (
                <div className="add_item_container">
                    <form onSubmit={handleSubmit} className="add_item_form">
                        {Object.keys(form).map((key) => 
                        key === "Department" ? (
                            <select
                            key={key}
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            className="add_item_input"
                          >
                            {departments.map((dept) => (
                              <option key={dept} value={dept}>
                                {dept}
                              </option>
                            ))}
                          </select>
                        ) : (
                        <input
                            key={key}
                            name={key}
                            value={form[key]}
                            onChange={handleChange}
                            placeholder={key}
                            className="add_item_input"
                        />
                        ))}
                        <button type="submit" className="add_item_button">
                        Add Inventory Item
                        </button>
                    </form>

                    {error && (
                        <div className="error_message">
                            {error}
                        </div>
                    )}
                </div>
            )}

            <button onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add New Item'}
            </button>

            <h2>Inventory Items</h2>
            <div className="inventory_table_wrapper">
                <table className="inventory_table">
                    <thead>
                        <tr>
                        {Object.keys(inventory[0] || {}).map((key) => (
                            <th key={key}onClick={() => handleSort(key)} style={{ cursor: 'pointer' }}>
                                {key}
                                {sortConfig.key === key && (sortConfig.direction === 'asc' ? ' ▼' : ' ▲')}
                            </th>
                        ))}
                        {['admin', 'manager', 'technician'].includes(role) && ( <th className="sticky_column"></th> )}
                        </tr>
                    </thead>
                    <tbody>
                        {sortedInventory.map((item) => (
                        <tr key={item.Id}>
                            {Object.keys(item).map((key) => (
                                <td key={key}>
                                {editingId === item.Id && key !== 'Created_Date' && key !== 'Last_Update' ? (
                                  key === 'Department' ? (
                                    <select
                                      name={key}
                                      value={editedItem[key]}
                                      onChange={handleInputChange}
                                      className="edit_input"
                                    >
                                      {departments.map((dep) => (
                                        <option key={dep} value={dep}>
                                          {dep}
                                        </option>
                                      ))}
                                    </select>
                                  ) : (
                                    <input
                                      name={key}
                                      value={editedItem[key]}
                                      onChange={handleInputChange}
                                      className="edit_input"
                                    />
                                  )
                                ) : (
                                  <>{item[key]}</>
                                )}
                              </td>
                            ))}
                            {['admin', 'manager', 'technician'].includes(role) && (
                                <td className="actions_column sticky_column">
                                    <div className="button_wrapper">
                                        {editingId === item.Id ? (
                                        <>
                                            <button onClick={() => handleSaveEdit()}><FaSave /></button>
                                            <button onClick={() => handleCancelEdit()}><FaTimes /></button>
                                        </>
                                        ) : (
                                        <>
                                            <button onClick={() => handleEditClick(item)}><FaEdit /></button>
                                            <button onClick={() =>     {const confirmed = window.confirm("Are you sure you want to delete this item?");
                                                                        if (confirmed) {
                                                                        handleDelete(item.Id);}
                                                                        }}><FaTrash /></button>
                                        </>
                                        )}
                                    </div>
                                </td>
                            )}
                        </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </div>
    );

}