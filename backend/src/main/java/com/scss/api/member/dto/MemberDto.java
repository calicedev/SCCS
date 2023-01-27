package com.scss.api.member.dto;

import java.sql.Timestamp;
import java.time.LocalDate;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@NoArgsConstructor
@AllArgsConstructor
@Data
public class MemberDto {

    String id;
    String password;
    String name;
    String nickname;
    String email;
    String profileImage;
    int score;
    Timestamp joinDate;
    String salt;
}
