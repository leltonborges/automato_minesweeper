use std::error::Error;
use std::fs::File;
use std::io::Read;
use std::string::String;

use serde::Deserialize;
use serde_yaml;

#[derive(Debug, Deserialize)]
pub struct Config {
    application: Application,
    server: Server,
}

#[derive(Debug, Deserialize)]
pub struct Application {
    name: String,
    description: String,
}

#[derive(Debug, Deserialize)]
struct Server {
    port: u16,
    host: String,
}
pub fn load_properties() -> Result<Config, Box<dyn Error>> {
    let mut file = File::open("properties.yaml")?;
    let mut contents = String::new();
    file.read_to_string(&mut contents)?;
    let config: Config = serde_yaml::from_str(&contents)?;
    Ok(config)
}

impl Config{
    pub fn name(&self) -> String{
        String::from(self.application.name.clone())
    }
    pub fn description(&self) -> String{
        String::from(self.application.description.clone())
    }
    pub fn host(&self) -> String{
        String::from(self.server.host.clone())
    }
    pub fn port(&self) -> u16{
        self.server.port.clone()
    }
}