package com.E1I5.mentaltal.board.respository;

import com.E1I5.mentaltal.board.entity.Board;
import org.springframework.data.jpa.repository.JpaRepository;

public interface BoardRepository extends JpaRepository<Board, Long> {
}
