package com.e1i5.mentaltal.board.entity;

import com.e1i5.mentaltal.comment.entity.Comment;
import com.e1i5.mentaltal.user.member.Member;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Entity
@Getter
@Setter
public class Board {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long boardId;

    @Transient
    private Long mid;

    @Column(nullable = false, length = 256)
    private String title;

    @Column(nullable = false, columnDefinition = "Text")
    private String content;

//    private String tags;

    @Column(nullable = false) // columnDefinition = "integer default 0"
    private int viewCount = 0;  // 조회수

    @Column(nullable = false)
    private int voteCount = 0;  // 공감수 (좋아요)

    private int commentCount = 0;

    @Column
    private LocalDateTime createdAt;


    @OneToMany(mappedBy = "board", cascade = CascadeType.REMOVE)
    private List<Comment> comments = new ArrayList<>();

    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "MEMBER_ID")
    private Member member;


    @Column
    private LocalDateTime modifiedAt = LocalDateTime.now();

    private String nickName;

    public void addMember(Member member) {
        if ( this.member != null) {
            this.member.getBoards().remove(this);
        }
        this.member = member;
        this.member.getBoards().add(this);
    }

    @ElementCollection
    public List<Long> checkVote = new ArrayList<>(); // 공감 처리 (+)

    @ElementCollection
    public List<Long> uncheckVote = new ArrayList<>(); // 공감 취소 (-)

    public void setViewCount(int viewCount) {
        this.viewCount = viewCount;
    }

    public void setVoteCount(int voteCount) {
        this.voteCount = voteCount;
    }

    public void plusCommentCount() {
        commentCount++;
    }

    public void minusCommentCount () {
        commentCount--;
    }



}
