package com.be;

import com.be.utils.TcpServer;
import org.springframework.boot.CommandLineRunner;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;

@SpringBootApplication
public class BeApplication {

    public static void main(String[] args) {
        SpringApplication.run(BeApplication.class, args);
    }

    @Bean
    CommandLineRunner init () {
        return _ -> TcpServer.createTcpServer("careerlift");
    }

}
