package com.Factory.DatabaseFactory;


import org.springframework.stereotype.Component;



@Component
public class DatabaseFactoryProducer {

    
    public DatabaseFactoryInterface getFactory(){
        if ("sqlite".equals("sqlite")){
            return new SQLiteDatabaseFactory();
        }
        return null;
    }
}
