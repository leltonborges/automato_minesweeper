use actix_web::{App, HttpServer};
use paperclip::actix::OpenApiExt;

use crate::api::api_config;
use crate::minesweeper::resource::{minesweeper_scope};
use crate::property::Config;

pub mod minesweeper;
mod property;
mod api;
pub mod constant;

#[actix_web::main]
async fn main() -> std::io::Result<()> {
    let config = Config::get_properties();
    HttpServer::new(move|| {
        App::new()
            .wrap_api_with_spec(api_config())
            .service(minesweeper_scope())
            .with_json_spec_at("/api/spec/v2")
            .with_json_spec_v3_at("/api/spec/v3")
            .with_swagger_ui_at("/swagger-ui/")
            .build()
    }).bind((config.host(), config.port()))?
        .run()
        .await
}