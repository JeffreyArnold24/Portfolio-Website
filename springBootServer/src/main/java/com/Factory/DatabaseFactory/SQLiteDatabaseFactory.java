package com.Factory.DatabaseFactory;

import com.DAOs.UsersDAOInterface;
import com.DAOs.UsersDAOSQLite;

public class SQLiteDatabaseFactory implements DatabaseFactoryInterface {

    @Override
    public UsersDAOInterface getUserDAOInterface() {
        return new UsersDAOSQLite();
    }
}
