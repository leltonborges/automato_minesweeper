use std::error::Error;
use std::fs::File;
use std::io::Read;
use std::string::String;

use serde::Deserialize;
use serde_yaml;
use crate::constant::PROPERTIES;

#[derive(Debug, Deserialize, Clone)]
pub struct Config {
    application: Application,
    server: Server,
    minesweeper: MinesweeperDefault,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Application {
    pub name: String,
    pub description: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Server {
    pub port: u16
    // pub host: String,
}

#[derive(Debug, Deserialize, Clone)]
pub struct MinesweeperDefault {
    pub start: Start,
    pub width: usize,
    pub height: usize,
    pub num_mines: usize,
    pub num_hints: usize,
    pub num_blocks: usize,
}

#[derive(Debug, Deserialize, Clone)]
pub struct Start {
    pub row: usize,
    pub col: usize,
}

pub fn load_properties() -> Result<Config, Box<dyn Error>> {
    let mut file = File::open("properties.yaml")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let config: Config = serde_yaml::from_str(&contents)?;
    Ok(config)
}

impl Config {
    pub fn get_properties() -> Config {
        PROPERTIES.clone()
    }

    pub fn name(&self) -> String {
        self.application.name.clone()
    }
    pub fn description(&self) -> String {
        self.application.description.clone()
    }
    pub fn port(&self) -> u16 {
        self.server.port.clone()
    }
    pub fn minesweeper(&self) -> MinesweeperDefault {
        self.minesweeper.clone()
    }
}