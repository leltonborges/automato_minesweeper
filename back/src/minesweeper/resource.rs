use actix_web::{Error, HttpResponse};
use paperclip::actix::{api_v2_operation, CreatedJson, web::{self, Json, Scope}};
use serde_valid::Validate;

use crate::constant::{DEFAULT_MINESWEEPER, MINESWEEPER, TREE_NODE};
use crate::minesweeper::board::{Cell, ConfigMinesweeper, Minesweeper};
use crate::minesweeper::node::{Node};

pub fn minesweeper_scope() -> Scope {
    web::scope("/minesweeper")
        .route("/start/default", web::get().to(default_minesweeper))
        .route("/reset/grid", web::get().to(reset_minesweeper))
        .route("/start/random/", web::post().to(random_minesweeper))
}

#[api_v2_operation(tags(Minefield))]
/// Serviço para inicializar o grid do jogo default
///
/// # Returns `Minesweeper`
async fn default_minesweeper() -> HttpResponse {
    let minesweeper = {
        let locked_minesweeper = MINESWEEPER.lock().unwrap();
        locked_minesweeper.clone()
    };
    HttpResponse::Ok().json(minesweeper)
}

#[api_v2_operation(tags(Minefield))]
/// Serviço para resetar o grid do jogo, seja o default ou random
///
/// # Returns `Minesweeper`
async fn reset_minesweeper() -> HttpResponse {
    let config = DEFAULT_MINESWEEPER.clone();
    match config.validate() {
        Ok(_) => {
           subscribe_minesweeper(Minesweeper::new_random(config));
            HttpResponse::Ok().finish()
        }
        Err(e) => HttpResponse::BadRequest().json(e)
    }
}

fn subscribe_minesweeper(minesweeper: Minesweeper) {
    let mut current_game = MINESWEEPER.lock().unwrap();
    let _ = std::mem::replace(&mut *current_game, minesweeper);
}

#[api_v2_operation(tags(Minefield))]
/// Serviço para inicializar o grid do jogo
///
/// Esta função recebe um `ConfigMinesweeper` e retorna um grid conforme as configurações recebidas
///
/// # Example
/// ```json
/// {
///  "height": 0,
///  "num_blocks": 0,
///  "num_hints": 0,
///  "num_mines": 0,
///  "width": 0
/// }
/// ```
///
/// Se a posição for inválida, será retornado um HTTP 400.
///
/// # Returns `Minesweeper`
async fn random_minesweeper(config: Json<ConfigMinesweeper>) -> HttpResponse {
    match config.validate() {
        Ok(_) => {
            let minesweeper = Minesweeper::new_random(config.into_inner());
            subscribe_minesweeper(minesweeper.clone());
            HttpResponse::Ok().json(minesweeper)
        }
        Err(e) => HttpResponse::BadRequest().json(e)
    }
}