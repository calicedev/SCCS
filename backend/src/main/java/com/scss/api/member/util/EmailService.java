package com.scss.api.member.util;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
public class EmailService {

    @Autowired
    private JavaMailSender sender;
    @Autowired
    private MailSender mailSender;

    public void sendEmail(String email, String title, String contents) throws MessagingException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();


        try {
            System.out.println("메일 전송 시작");
            simpleMailMessage.setFrom("sccsdevteam@gmail.com");
            simpleMailMessage.setTo("dojsfffff@naver.com");
            simpleMailMessage.setSubject("안녕");
            simpleMailMessage.setText("하이");
            //sender.send(simpleMailMessage);
            mailSender.send(simpleMailMessage);
            System.out.println("메일 전송 완료");
        } catch (Exception e) {
            e.printStackTrace();
        }

    }

}
