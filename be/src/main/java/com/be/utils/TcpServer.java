package com.be.utils;

import org.h2.tools.Server;

import java.sql.SQLException;

public class TcpServer {
    public static void createTcpServer(String dbUrl) throws SQLException {
        String dbPort = "9092";
        Server tcpServer = Server.createTcpServer(
                "-tcp", "-tcpAllowOthers", "-tcpPort", dbPort);
        System.out.println("Tcp server start: " + tcpServer.start());
        System.out.println(tcpServer.getStatus() + " " +
                tcpServer.getPort());
        System.out.println("jdbc:h2:tcp://localhost:" + dbPort + "/mem:" + dbUrl);
    }
}
