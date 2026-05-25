/*
 * Click nbfs://nbhost/SystemFileSystem/Templates/Licenses/license-default.txt to change this license
 */

package com.mycompany.registration;

/**
 *
 * @author RC_Student_lab
 */
import java.util.Scanner;

public class Registration {

    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        Login login = new Login();
        MessageStorage storage = new MessageStorage();

        // Registration
        System.out.println("===== Registration =====");

        System.out.print("Enter First Name: ");
        login.firstName = scanner.nextLine();

        System.out.print("Enter Last Name: ");
        login.surname = scanner.nextLine();

        System.out.print("Enter Username: ");
        login.userName = scanner.nextLine();

        System.out.print("Enter Password: ");
        login.password = scanner.nextLine();

        System.out.print("Enter cellphone number: ");
        login.cellPhone = scanner.nextLine();

        System.out.println(login.registerUser());

        while (!login.checkUsername() || !login.checkPasswordComplexity()) {

            System.out.println("Try to register again!");

            System.out.print("Enter Username: ");
            login.userName = scanner.nextLine();

            System.out.print("Enter Password: ");
            login.password = scanner.nextLine();

            System.out.print("Enter cellphone number: ");
            login.cellPhone = scanner.nextLine();

            System.out.println(login.registerUser());
        }

        // Login
        System.out.println("\n===== Login =====");

        System.out.print("Enter Username: ");
        login.enteredUserName = scanner.nextLine();

        System.out.print("Enter Password: ");
        login.enteredPassword = scanner.nextLine();

        System.out.print("Enter cellphone number: ");
        login.enteredCell = scanner.nextLine();

        System.out.println(login.returnLoginStatus());

        while (!login.loginUser()) {

            System.out.println("Try to login again.");

            System.out.print("Enter Username: ");
            login.enteredUserName = scanner.nextLine();

            System.out.print("Enter Password: ");
            login.enteredPassword = scanner.nextLine();

            System.out.print("Enter cellphone number: ");
            login.enteredCell = scanner.nextLine();

            System.out.println(login.returnLoginStatus());
        }

        // Menu
        System.out.println("\nWelcome to QuickChat.");

        System.out.print("How many messages would you like to send? ");
        int total = Integer.parseInt(scanner.nextLine());

        int count = 0;

        while (true) {

            System.out.println("""
                    
                    Please select an option:
                    1) Send Messages
                    2) Show Recently Sent Messages
                    3) Quit
                    """);

            String menu = scanner.nextLine();

            switch (menu) {

                case "1":

                    if (count >= total) {
                        System.out.println("Message limit reached.");
                        break;
                    }

                    System.out.print("Enter recipient number (include + country code): ");
                    String recipient = scanner.nextLine();

                    if (!Message.isValidRecipient(recipient)) {
                        System.out.println("Invalid recipient format.");
                        break;
                    }

                    System.out.print("Enter message (max 250 chars): ");
                    String msg = scanner.nextLine();

                    if (!Message.isValidMessage(msg)) {
                        System.out.println("Message too long.");
                        break;
                    }

                    Message m = new Message(recipient, msg);

                    System.out.println("""
                            
                            Choose message option:
                            1) Send
                            2) Disregard
                            3) Store for later
                            """);

                    String action = scanner.nextLine();

                    switch (action) {

                        case "1":
                            m.send();
                            storage.addMessage(m);
                            count++;

                            System.out.println("Message sent!");
                            System.out.println(m.getMessageDetails());
                            break;

                        case "2":
                            m.disregard();
                            System.out.println("Message disregarded.");
                            break;

                        case "3":
                            m.store();
                            storage.addMessage(m);
                            count++;

                            System.out.println("Message stored.");
                            System.out.println(m.getMessageDetails());
                            break;

                        default:
                            System.out.println("Invalid action.");
                    }

                    break;

                case "2":
                    System.out.println("Coming Soon.");
                    break;

                case "3":
                    System.out.println("Exiting. Total messages: " + storage.getTotalMessages());

                    storage.saveMessagesToJson("messages.json");

                    scanner.close();
                    return;

                default:
                    System.out.println("Invalid menu option.");
            }
        }
    }
}