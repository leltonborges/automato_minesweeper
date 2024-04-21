use std::sync::Mutex;

use actix_web::HttpResponse;
use once_cell::sync::Lazy;
use paperclip::actix::{api_v2_operation, web::{self, Json, Scope}};
use serde_valid::Validate;

use crate::minesweeper::board::{ConfigMinesweeper, Minesweeper};

 const CONFIG: ConfigMinesweeper = ConfigMinesweeper {
    width: 5,
    height: 5,
    num_mines: 3,
    num_hints: 3,
    num_blocks: 3
};
static MINESWEEPER: Lazy<Mutex<Minesweeper>> = Lazy::new(|| Mutex::new(Minesweeper::new_random(CONFIG)));

pub(crate) fn minesweeper_scope() -> Scope {
    return web::scope("/minesweeper")
        .route("/start/default", web::get().to(default_minesweeper))
        .route("/reset/default", web::get().to(reset_minesweeper))
        .route("/start/random/", web::post().to(random_minesweeper));
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
/// Serviço para resetar o grid do jogo default
///
/// # Returns `Minesweeper`
async fn reset_minesweeper() -> HttpResponse {
    subscribe_minesweeper(Minesweeper::new_random(CONFIG));
    HttpResponse::Ok().finish()
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