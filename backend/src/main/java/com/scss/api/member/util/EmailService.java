package com.scss.api.member.util;

import javax.mail.MessagingException;
import javax.mail.internet.MimeMessage;

import com.scss.api.member.controller.MemberController;
import com.scss.api.member.dto.MemberDto;
import com.scss.api.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class EmailService {
    private static final Logger logger = LoggerFactory.getLogger(EmailService.class);
    // 생성자 주입
    private final MailSender mailSender;
    private final EncryptService encryptService;
    private final MemberService memberService;

    // Todo : 비밀번호 랜덤 생성 로직 만들기, 함수를 기능 1개 단위로 분리하기
    public void sendEmail(String id, String email) throws MessagingException {
        SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

        try {
            MemberDto memberDto = memberService.memberInfo(id);
            String raw = "2345";

            String title = "[SCCS] - 임시 비밀번호 발급";
            String contents = id + "님의 임시 비밀번호는 : '" + raw + "'입니다";

            memberDto.setPassword(raw);
            memberService.modifyPassword(memberDto);

            logger.debug("메일 전송 시작");
            simpleMailMessage.setTo(email); // 받는 사람
            simpleMailMessage.setSubject(title); // 제목
            simpleMailMessage.setText(contents); // 내용
            mailSender.send(simpleMailMessage);
            logger.debug("메일 전송 완료");
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
