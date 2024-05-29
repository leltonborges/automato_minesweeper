use std::collections::HashMap;
use std::sync::{Arc, Mutex, Weak};
use paperclip::actix::Apiv2Schema;

use serde::{Deserialize, Serialize};

use super::board::Cell;

#[derive(Debug, Serialize, Deserialize)]
pub struct Node {
    pub position: Cell,
    pub children: Mutex<HashMap<(usize, usize), Arc<Node>>>,
    parent: Mutex<Weak<Node>>,
}

#[derive(Debug, Clone, Serialize, Deserialize, Apiv2Schema)]
pub struct NodeData {
    pub position: Cell,
    pub children: Vec<NodeData>,
}
impl Node {
    pub fn new(position: Cell) -> Arc<Self> {
        Arc::new(Node {
            position,
            children: Mutex::new(HashMap::new()),
            parent: Mutex::new(Weak::new()),
        })
    }

    pub fn add_child(self: &Arc<Self>, child: Arc<Node>) {
        let mut children = self.children.lock().unwrap();
        let key = (child.position.row, child.position.col);

        *child.parent.lock().unwrap() = Arc::downgrade(self);
        children.insert(key, child.clone());
    }

    pub fn find_child_by_position(&self, row: usize, col: usize) -> Option<Arc<Node>> {
        let children = self.children.lock().unwrap();

        if let Some(child) = children.get(&(row, col)) {
            return Some(Arc::clone(child));
        }

        for child in children.values() {
            let result = child.find_child_by_position(row, col);
            if result.is_some() {
                return result;
            }
        }

        None
    }

    pub fn get_node_data(&self) -> NodeData {
        let children = self.children.lock().unwrap();
        let child_vector = children.values()
            .map(|child_node| child_node.get_node_data())
            .collect::<Vec<NodeData>>();

        NodeData {
            position: self.position.clone(),
            children: child_vector,
        }
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn test_no_duplicate_children() {
        let root_cell = Cell::new_free(0, 0);
        let root_node = Node::new(root_cell);

        let child_cell1 = Cell::new_free(1, 1);
        let child_node1 = Node::new(child_cell1);

        let child_cell2 = Cell::new_free(1, 1);
        let child_node2 = Node::new(child_cell2);

        let child_cell3 = Cell::new_free(1, 2);
        let child_node3 = Node::new(child_cell3);

        root_node.add_child(child_node1);
        root_node.add_child(child_node2);
        root_node.add_child(child_node3);

        let node_data = root_node.get_node_data();

        assert_eq!(node_data.children.len(), 2);
    }

    #[test]
    fn test_recursive_find_child_by_position() {
        let root_cell = Cell::new_free(0, 0);
        let root_node = Node::new(root_cell);

        let child_cell = Cell::new_free(1, 1);
        let child_node = Node::new(child_cell);
        root_node.add_child(child_node);

        let grandchild_cell = Cell::new_free(2, 2);
        let grandchild_node = Node::new(grandchild_cell);
        root_node.children.lock().unwrap().get(&(1, 1)).unwrap().add_child(grandchild_node);

        let found_node = root_node.find_child_by_position(2, 2).unwrap();
        assert_eq!(found_node.position.row, 2);
        assert_eq!(found_node.position.col, 2);

        assert!(root_node.find_child_by_position(3, 3).is_none());
    }

    #[test]
    fn test_parent_child_relationship() {
        let parent_cell = Cell::new_free(0, 0);
        let parent_node = Node::new(parent_cell);

        let child_cell = Cell::new_free(1, 1);
        let child_node = Node::new(child_cell);

        parent_node.add_child(Arc::clone(&child_node));

        // Testa se a configuração do pai está correta
        let weak_parent = child_node.parent.lock().unwrap();
        assert!(weak_parent.upgrade().is_some());
    }
}
