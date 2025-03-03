terraform {
  required_providers {
    google-beta = {
      source  = "hashicorp/google-beta"
      version = "~> 5.0"
    }
  }
}

provider "google-beta" {
  user_project_override = false
  region                = "asia-northeast1"
}

# Firebase プロジェクト用の GCP プロジェクトを立ち上げる
resource "google_project" "default" {
  provider = google-beta

  # project_id は全世界で一意になる必要がある
  project_id      = "c4s-cloud-sandbox-20250304"
  name            = "C4s-CloudF-sandbox"

  # Firebase のプロジェクトとして表示するために必要
  labels = {
    "firebase" = "enabled"
  }
}

# 各APIの有効化
resource "google_project_service" "default" {
  provider = google-beta
  project = google_project.default.project_id
  for_each = toset([
    "serviceusage.googleapis.com",
    "firebase.googleapis.com",
    "identitytoolkit.googleapis.com",
    "firestore.googleapis.com",
    "firebaserules.googleapis.com",
    "firebasestorage.googleapis.com",
    "storage.googleapis.com",
    "firebasehosting.googleapis.com",
  ])
  service = each.key
  disable_on_destroy = false
}

# Firebase のプロジェクトを立ち上げる
resource "google_firebase_project" "default" {
  provider = google-beta
  project  = google_project.default.project_id

  depends_on = [
    google_project_service.default,
  ]
}