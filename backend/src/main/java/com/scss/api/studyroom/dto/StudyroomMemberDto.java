package com.scss.api.studyroom.dto;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
@NoArgsConstructor
@AllArgsConstructor
@Data
public class StudyroomMemberDto {
    private int id;
    private int studyroomId;
    private String MemberId;
}

