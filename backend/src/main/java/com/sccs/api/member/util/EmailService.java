package com.sccs.api.member.util;

import com.sccs.api.member.dto.MemberDto;
import com.sccs.api.member.service.MemberService;
import javax.mail.MessagingException;
import lombok.RequiredArgsConstructor;
import org.apache.commons.lang3.RandomStringUtils;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.mail.MailSender;
import org.springframework.mail.SimpleMailMessage;
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
  public boolean sendEmail(String id, String email) throws MessagingException {
    SimpleMailMessage simpleMailMessage = new SimpleMailMessage();

    try {
      MemberDto memberDto = memberService.memberInfo(id);
      String raw = RandomStringUtils.randomAlphanumeric(8); // 8자리 랜덤 비밀번호 생성

      String title = "[SCCS] - 임시 비밀번호 발급";
      String contents = "안녕하세요 SCCS 입니다. :)"  + "\n" +id + "님의 임시 비밀번호는 : '" + raw + "'입니다";

      memberDto.setPassword(raw);
      memberService.modifyPassword(memberDto);

      logger.debug("메일 전송 시작");
      simpleMailMessage.setTo(email); // 받는 사람
      simpleMailMessage.setSubject(title); // 제목
      simpleMailMessage.setText(contents); // 내용
      mailSender.send(simpleMailMessage);
      logger.debug("메일 전송 완료");
      return true;
    } catch (Exception e) {
      e.printStackTrace();
      return false;
    }
  }
}
